import app from "./app";

const port = process.env.PORT || 7373;

app.listen(port, (err) => {
  if (err) {
    console.log((err as Error).message);
    process.exit(1);
  }
  console.log(`server started at http://localhost:${port}`);
});
