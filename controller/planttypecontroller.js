import con from "../admindb.js";
// SELECT DATA
export const getplanttype = async (req, res) => {
  let dataall = "select * from tblplanttype";
  con.query(dataall, (err, allData) => {
    if (err) {
      throw err;
    }
    res.send(allData);
  });
};


//SELECT SINGLE DATA
export const getOneplanttype = async (req, res) => {
    try {
      const id = req.params.id;
      let conall = "select *  from tblplanttype where plant_name = " + id;
      con.query(conall, (err, allData) => {
        if (err) {
          throw err;
        }
        res.send(allData);
      });
    } catch (error) {
      res.status(500).json({ error: error + "getone" });
    }
  };



// INSERT DATA
export const createplanttype = async (req, res) => {
  try {
    const {plant_name,priority} = req.body;

    con.query(
      "INSERT INTO tblplanttype (`plant_name`,`priority`)  VALUES (?,?)",
      [plant_name,priority],
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
export const updateplanttype = async (req, res) => {
  try {
      const { id } = req.params;  // Extract 'id' from request parameters
      const {  plant_name, priority } = req.body;

      // Log the input for debugging
      // console.log("Inj_Volt:", Inj_Volt);
      console.log("ID:", id);

      const sqlUpdate = `
          UPDATE tblplanttype 
          SET plant_name = ?, priority = ?  WHERE id = ?
      `;

      con.query(sqlUpdate, [ plant_name, priority, id], (err, result) => {
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
export const deleteplanttype = async (req, res) => {
  try {
      const id = req.params.id;

      // Step 1: Delete the record with the specified ID
      const deleteQuery = "DELETE FROM tblplanttype WHERE id = ?";
      
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
              const updateIdsQuery = "UPDATE tblplanttype SET id = @autoid := (@autoid + 1)";
              con.query(updateIdsQuery, (err) => {
                  if (err) {
                      console.error("Error updating IDs:", err);
                      return res.status(500).send("Error updating IDs");
                  }

                  // Step 4: Reset AUTO_INCREMENT to 1
                  const resetAutoIncrementQuery = "ALTER TABLE tblplanttype AUTO_INCREMENT = 1";
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
