import con from "../db.js"

export const getplantreadmas = async(req, res) =>{
    let chrgsall = "select * from tblplantreadmas";
    con.query(chrgsall,(err,userData)=>{
        if(err){ throw err  }
        res.send(userData);
    })
}

export const getmaxplantreadmas = async (req, res) => {
  try {
    const id = req.params.id;
    let conall = "SELECT * FROM `tblplantreadmas` WHERE `mo_year`=(SELECT max(mo_year) as mo_year FROM `tblplantreadmas`)";
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

//SELECT SINGLE DATA
export const getOneplantreadmas = async (req, res) => {
    try {
      const id = req.params.id;
      // console.log(id);
      let conall = "select *  from tblplantreadmas where mo_year = '" + id +"'";
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
export const createplantreadmas = async (req, res) => {
  try {
    const data = req.body; // `req.body` is an array of objects
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid input data format. Expected an array." });
    }

    const query =
      "INSERT INTO `tblplantreadmas`( `com_id`, `con_htscno`, `weg_htscno`, `mo_year`, `line_loss`, `c1`, `c2`, `c3`, `c4`, `c5`, `i_s`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Iterate over the array and insert each object
    for (const item of data) {
      const {
        com_id,
        con_htscno,
        weg_htscno,
        mo_year = new Date().toISOString().slice(0, 7), // Default to current month/year if not provided
        lin_loss,
        c1,
        c2,
        c3 = 0, // Provide default value if `c3` is not included
        c4,
        c5,
        is
      } = item;

      await new Promise((resolve, reject) => {
        con.query(
          query,
          [com_id, con_htscno, weg_htscno, mo_year, lin_loss, c1, c2, c3, c4, c5, is],
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
      });
    }

    res.json({ message: "All data added successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "An error occurred while inserting data" });
  }
};

// UPDATE DATA
export const updateplantreadmas = async (req, res) => {
  try {
      const { id } = req.params;  // Extract 'id' from request parameters
      const {com_id, con_htscno, weg_htscno, mo_year, line_loss, c1, c2, c3, c4, c5, i_s } = req.body;

      // Log the input for debugging
      // console.log("Inj_Volt:", Inj_Volt);
      // console.log("ID:", id);

      const sqlUpdate = `
          UPDATE tblplantreadmas 
          SET  com_id = ?, con_htscno = ?, weg_htscno = ?, mo_year = ?, line_loss = ?, c1 = ?, c2 = ?, c3 = ?, c4 = ?, c5 = ?, i_s = ?  WHERE id = ?
      `;

      con.query(sqlUpdate, [ com_id, con_htscno, weg_htscno, mo_year, line_loss, c1, c2, c3, c4, c5, i_s, id], (err, result) => {
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
export const deleteplantreadmas = async (req, res) => {
  try {
      const id = req.params.id;
console.log("plant");
      // Step 1: Delete the record with the specified ID
      const deleteQuery = "DELETE FROM tblplantreadmas WHERE id = ?";
      
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
              const updateIdsQuery = "UPDATE tblplantreadmas SET id = @autoid := (@autoid + 1)";
              con.query(updateIdsQuery, (err) => {
                  if (err) {
                      console.error("Error updating IDs:", err);
                      return res.status(500).send("Error updating IDs");
                  }

                  // Step 4: Reset AUTO_INCREMENT to 1
                  const resetAutoIncrementQuery = "ALTER TABLE tblplantreadmas AUTO_INCREMENT = 1";
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
