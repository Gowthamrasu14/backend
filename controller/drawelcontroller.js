import con from "../admindb.js";
// SELECT DATA
export const getdrawel = async (req, res) => {
  let dataall = "select * from tbldrawel";
  con.query(dataall, (err, allData) => {
    if (err) {
      throw err;
    }
    res.send(allData);
  });
};
// INSERT DATA
export const createdrawel = async (req, res) => {
  try {
    const { drawel } = req.body;
   
    con.query(
      "INSERT INTO tbldrawel (`drawel`)  VALUES (?)",
      [drawel],
      (err, result) => {
        if (err) throw err;
        res.json({ message: "Data added successfully", id: result.insertId });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
// UPDATE DATA
export const updatedrawel = async (req, res) => {
  try {
    const  id = req.params.id; 
    const  id1 = req.params.id1; // Extract id and id2 from the request parameters
  
      const sqlUpdate = "UPDATE tbldrawel SET drawel = ? WHERE id = ?";
      con.query(sqlUpdate, [id1, id], (err, result) => {
        if (err) {
          console.error("Error updating record:", err);
          return res.status(500).json({ error: "Error updating record" });
        }
        res.json({ message: "Record updated successfully", result });
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: error.message });
    }
  };
// DELETE DATA
export const deletedrawel = async (req, res) => {
  try {
      const id = req.params.id;

      // Step 1: Delete the record with the specified ID
      const deleteQuery = "DELETE FROM tbldrawel WHERE id = ?";
      
      con.query(deleteQuery, [id], (err, userData) => {
          if (err) {
              console.error("Error deleting record:", err);
              return res.status(500).send("Error deleting record");
          }

          // Step 2: Set @autoid variable to 0
          const setAutoidQuery = "SET @autoid = 0";
          con.query(setAutoidQuery, (err) => {
              if (err) {
                  console.error("Error setting @autoid:", err);
                  return res.status(500).send("Error setting @autoid");
              }

              // Step 3: Update IDs sequentially
              const updateIdsQuery = "UPDATE tbldrawel SET id = @autoid := (@autoid + 1)";
              con.query(updateIdsQuery, (err) => {
                  if (err) {
                      console.error("Error updating IDs:", err);
                      return res.status(500).send("Error updating IDs");
                  }

                  // Step 4: Reset AUTO_INCREMENT to 1
                  const resetAutoIncrementQuery = "ALTER TABLE tbldrawel AUTO_INCREMENT = 1";
                  con.query(resetAutoIncrementQuery, (err) => {
                      if (err) {
                          console.error("Error resetting AUTO_INCREMENT:", err);
                          return res.status(500).send("Error resetting AUTO_INCREMENT");
                      }

                      res.send({ message: "Record deleted and reset successfully." });
                  });
              });
          });
      });
  } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: error.message });
  }
};
