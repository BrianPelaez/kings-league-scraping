import { Hono } from "hono";
import { serveStatic } from "hono/serve-static.module";
import leaderboard from "../db/leaderboard.json";
import presidents from "../db/presidents.json";
import teams from "../db/teams.json";

const app = new Hono();

app.get("/", (ctx) => {
  return ctx.json([
	{
		endpoint: "/leaderboard",
		description: "Returns Kings League leaderboard",
	  },
    {
      endpoint: "/teams",
      description: "Returns Kings League teams",
    },
    {
      endpoint: "/presidents",
      description: "Returns Kings League presidents",
    },
  ]);
});

app.get("/leaderboard", (ctx) => {
  return ctx.json(leaderboard);
});

app.get("/presidents", (ctx) => {
  return ctx.json(presidents);
});

app.get("/presidents/:id", (ctx) => {
	const id = ctx.req.param('id');
	const foundPresident = presidents.find((president) => president.id == id)

	return foundPresident ? ctx.json(foundPresident) : ctx.json({message: 'President Not Found'});

  });

app.get("/teams", (ctx) => {
  return ctx.json(teams);
});

// Devuelve el contenido de la ruta /assets/static/...
app.get("/static/*", serveStatic({ root: "./" }));

export default app;
