import { Router } from "express";
import { CountryModel, ICountry } from "../models/country";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const countries: ICountry[] = await CountryModel.find(
      {},
      { __v: 0 }
    ).exec();
    return res.json(countries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const country = await CountryModel.findById(req.params.id, {
      __v: 0,
    }).exec();
    if (!country) throw new Error("Country not found");
    return res.json(country);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

routes.post("/", async (req, res) => {
  try {
    const country: ICountry = req.body;

    const countryExists = await CountryModel.findOne({
      name: country.name,
    }).exec();

    if (countryExists) {
      return res
        .status(409)
        .json({ error: "There is already another country with this name" });
    }

    const newCountry = await CountryModel.create(country);
    return res.status(201).json(newCountry);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

routes.post("/many", async (req, res) => {
  try {
    const countries: ICountry[] = req.body;

    const countryExists = await CountryModel.find({
      name: { $in: countries.map((country) => country.name) },
    }).exec();

    if (countryExists.length > 0) {
      return res
        .status(409)
        .json({ error: "There is already another country with this name" });
    }

    const newCountries = await CountryModel.create(countries);
    return res.status(201).json(newCountries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

export default routes;
