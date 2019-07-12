/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/

const express = require("express");
const data = require("./data/helpers/projectModel.js");
const server = express();
server.use(express.json()); // << to parse JSON in POST

server.get("/api", (req, res) => {
  res.send(`
      <h2>Here's hoping</h2>
    `);
});

// server.use("/api", dbRouter);

// const port = process.env.PORT || 4003;
// server.listen(port, () => {
//   console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
// });

// R GET

// server.get("/data", (req, res) => {
//   data
//     .find()
//     .then(id => {
//       res.status(200).json({ id });
//     })
//     .catch(error => {
//       res.status(500).json({ message: "couldn't get" });
//     });
// });

server.get("/data", (req, res) => {
  data
    .find()
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

// server.get("/data", async (req, res) => {
//   try {
//     const db = await data.get(req.query);
//     res.status(200).json(db);
//   } catch (error) {
//     res.status(500).json({ message: "error from get" });
//   }
// });

// R getProjectActions

// C INSERT

// U UPDATE

// D REMOVE

server.delete("/api/users/:id", (req, res) => {
  data
    .remove(req.params.id)
    .then(deleted => {
      if (deleted && deleted > 0) {
        res.status(200).json({ message: "user deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

const port = 4003;
server.listen(port, () => console.log(`running on port ${port}`));
