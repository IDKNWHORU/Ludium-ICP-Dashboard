import express from "express";

const app = express();
app.use(express.json());

app.post("/greet", async (req, res) => {
  const missionSubmitListRes = await fetch(
    "https://api.ludium.world/mission/34bb16b5-7e76-4988-9b49-802355a6fa22/submit"
  );

  const missionSubmitList = await missionSubmitListRes.json();
  const resultPromises = missionSubmitList.map(
    async ({ usrId, description, createAt, status }) => {
      const userRes = await fetch(`https://api.ludium.world/user/${usrId}`);
      const { nick } = await userRes.json();

      return {
        description,
        createAt,
        status,
        nick,
      };
    }
  );

  const result = await Promise.all(resultPromises);

  res.json(result);
});

app.use(express.static("/dist"));
app.listen();
