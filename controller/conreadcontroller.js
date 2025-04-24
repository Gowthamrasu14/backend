import con from "../db.js"

export const getconread = async(req, res) =>{
    let chrgsall = "select * from tblconread";
    con.query(chrgsall,(err,userData)=>{
        if(err){ throw err  }
        res.send(userData);
    })
}

export const getmaxconread = async(req, res) =>{
  let chrgsall = "SELECT * FROM `tblconread` WHERE mo_year= (select max(mo_year) as mo_year FROM tblconread);";
  con.query(chrgsall,(err,userData)=>{
      if(err){ throw err  }
      res.send(userData);
  })
}

//SELECT SINGLE DATA
export const getOneconread = async (req, res) => {
    try {
      const id = req.params.id;
      let conall = "select *  from tblconread where id = " + id;
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
export const createconread = async (req, res) => {
  try {
    const { com_id, htscno, date, c1, c2,  c4, c5} = req.body;

    con.query(
      "INSERT INTO `tblconread`(`com_id`, `con_htscno`, `mo_year`, `c1`, `c2`,  `c4`, `c5`, `c_c1`, `c_c2`, `c_c4`, `c_c5`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [com_id, htscno, date, c1, c2,  c4, c5, c1, c2,  c4, c5],
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
export const updateconread = async (req, res) => {
  try {
      const { id } = req.params;  // Extract 'id' from request parameters
      const {  com_id, con_htscno, date, c1, c2,  c4, c5, c_c1, c_c2, c_c4, c_c5 } = req.body;

      // Log the input for debugging
      // console.log("Inj_Volt:", Inj_Volt);
      // console.log("ID:", id);

      const sqlUpdate = `
          UPDATE tblconread 
          SET com_id = ?, con_htscno = ? , mo_year = ? , c1 = ? , c2 = ? ,  c4 = ? , c5 = ? , c_c1 = ? , c_c2 = ? , c_c4 = ? , c_c5 = ?  WHERE id = ?
      `;

      con.query(sqlUpdate, [com_id, con_htscno, date, c1, c2,  c4, c5, c_c1, c_c2, c_c4, c_c5, id], (err, result) => {
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
export const deleteconread = async (req, res) => {
  try {
      const id = req.params.id;

      // Step 1: Delete the record with the specified ID
      const deleteQuery = "DELETE FROM tblconread WHERE id = ?";
      
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
              const updateIdsQuery = "UPDATE tblconread SET id = @autoid := (@autoid + 1)";
              con.query(updateIdsQuery, (err) => {
                  if (err) {
                      console.error("Error updating IDs:", err);
                      return res.status(500).send("Error updating IDs");
                  }

                  // Step 4: Reset AUTO_INCREMENT to 1
                  const resetAutoIncrementQuery = "ALTER TABLE tblconread AUTO_INCREMENT = 1";
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
