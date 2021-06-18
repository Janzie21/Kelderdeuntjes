import { knex } from "../../components/Helper";
export default async (req, res) => {
  //if (req.method === "post") {
  console.log(req.body);
  const data = await knex("newsletter")
    .insert(JSON.parse(req.body))
  res.status(200).json({ sent: "ok" });
  //}
};
