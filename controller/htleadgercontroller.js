import con from "../db.js"



export const gethtleadger = async(req, res) =>{
    let chrgsall = "select * from tblhtledger";
    con.query(chrgsall,(err,userData)=>{
        if(err){ throw err  }
        res.send(userData);
    })
}

const formatDate = (dateString) => {
  if (!dateString) return null; // Ensure valid input

  // Check if the date is in DD/MM/YYYY format (common issue)
  const dateParts = dateString.split("/");
  if (dateParts.length === 3 && dateParts[2].length === 4) {
      // Convert from DD/MM/YYYY → YYYY-MM-DD
      dateString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
      console.error("Invalid date received:", dateString);
      return null; // Return null for invalid dates
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


export const getdatehtleadger = async (req, res) => {
  try {
      let { startDate, endDate } = req.params;

      // console.log("Raw Params Received:", startDate, endDate); // Debugging log

      if (!startDate || !endDate) {
          return res.status(400).json({ error: "Missing required parameters" });
      }

      // Convert `-` to `/` if needed
      startDate = startDate.replace(/-/g, "/");
      endDate = endDate.replace(/-/g, "/");

      // console.log("Converted Params:", startDate, endDate); // Debugging log

      // Format dates safely
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      if (!formattedStartDate || !formattedEndDate) {
          return res.status(400).json({ error: "Invalid date format" });
      }

      // console.log("Formatted Params:", formattedStartDate, formattedEndDate); // Debugging log

      const query = "SELECT * FROM tblhtledger WHERE mo_year BETWEEN ? AND ?";
      
      con.query(query, [formattedStartDate, formattedEndDate], (err, results) => {
          if (err) {
              console.error("Database error:", err);
              return res.status(500).json({ error: "Database query failed" });
          }
          res.json(results);
      });
  } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};



//SELECT SINGLE DATA
export const getOnehtleadger = async (req, res) => {
    try {
      const id = req.params.id;
      let conall = "select *  from tblhtledger where id = " + id;
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
export const createhtleadger = async (req, res) => {
  const data = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "Invalid data format. Expected an array." });
  }

  try {
    const insertPromises = data.map((entry) => {
      return new Promise((resolve, reject) => {
        const {
          com_id, con_htscno, weg_htscno, date, gen_name, gen_type, is, drawal, inj_volt, ll, ban_op,
          lc1, lc2, lc4, lc5, c1, c2, c4, c5, ac1, ac2, ac4, ac5, inpkc1_c2, inpkc2_c1, insc1_c5, 
          insc1_c4, insc2_c5, insc2_c4, insc4_c5, cbc1, cbc2, cbc4, cbc5, bc1, bc2, bc4, bc5, gbc1, 
          gbc2, gbc4, gbc5, wc, css, cc1, cc2, cc4, cc5, amr, om, other, rkvah, sch, soc, trans, iec, dsm
        } = entry;

        // First, execute the INSERT query
        con.query(
          "INSERT INTO `tblhtledger` (`com_id`, `con_htscno`, `weg_htscno`, `mo_year`, `gen_name`, `gen_type`, `i_s`, `drawal`, `inj_volt`, `line_loss`, `ban_op`, `G_ALL_C1`, `G_ALL_C2`, `G_ALL_C4`, `G_ALL_C5`, `ALL_C1`, `ALL_C2`, `ALL_C4`, `ALL_C5`, `NOAD_C1`, `NOAD_C2`, `NOAD_C4`, `NOAD_C5`, `INTPK_C1_C2`, `INTPK_C2_C1`, `INTAD_C1_C5`, `INTAD_C1_C4`, `INTAD_C2_C5`, `INTAD_C2_C4`, `INTAD_C4_C5`, `CON_C1`, `CON_C2`, `CON_C4`, `CON_C5`, `BAL_C1`, `BAL_C2`, `BAL_C4`, `BAL_C5`, `BAL_NETC1`, `BAL_NETC2`, `BAL_NETC4`, `BAL_NETC5`, `amr`, `om`, `trans`, `soc`, `rkvah`, `iec`, `sch`, `other`, `dsm`, `W_CHRGS`, `css`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [com_id, con_htscno, weg_htscno, date, gen_name, gen_type, is, drawal, inj_volt, ll, ban_op, lc1, lc2, lc4, lc5, c1, c2, c4, c5, ac1, ac2, ac4, ac5, inpkc1_c2, inpkc2_c1, insc1_c5, insc1_c4, insc2_c5, insc2_c4, insc4_c5, cbc1, cbc2, cbc4, cbc5, bc1, bc2, bc4, bc5, gbc1, gbc2, gbc4, gbc5,amr, om, trans, soc, rkvah, iec, sch, other, dsm, wc, css],
          (err, result) => {
            if (err) {
              return reject(err);
            }

            // If INSERT is successful, execute the first UPDATE query
            con.query(
              "UPDATE `tblplantread` SET `cc1`= ?, `cc2`= ?, `cc4`= ?, `cc5`= ?, `amr`=`amr`- ?, `om`=`om`- ?, `trans`=`trans`- ?, `soc`=`soc`- ?, `rkvah`=`rkvah` - ?, `iec`=`iec` - ?, `sch`=`sch` - ?, `other`=`other` - ?, `dsm`=`dsm` - ? WHERE `planthtscno` = ? AND `mo_year` = ?",
              [cc1, cc2, cc4, cc5, amr, om, trans, soc, rkvah, iec, sch, other, dsm, weg_htscno, date],
              (err1, result1) => {
                if (err1) {
                  return reject(err1);
                }

                // If first UPDATE is successful, execute the second UPDATE query
                con.query(
                  "UPDATE `tblconread` SET `c_c1`= ?, `c_c2`= ?, `c_c4`= ?, `c_c5`= ? WHERE `con_htscno` = ? AND `mo_year` = ?",
                  [cbc1, cbc2, cbc4, cbc5, con_htscno, date],
                  (err2, result2) => {
                    if (err2) {
                      return reject(err2);
                    }

                    // If all queries succeed, resolve the promise
                    resolve({ insertId: result.insertId, affectedRows1: result1.affectedRows, affectedRows2: result2.affectedRows });
                  }
                );
              }
            );
          }
        );
      });
    });

    const results = await Promise.all(insertPromises);
    res.json({ message: "Data added and updated successfully", results });

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// UPDATE DATA
export const updatehtleadger = async (req, res) => {
  try {
      const { id } = req.params;  // Extract 'id' from request parameters
      const {  com_id ,  con_htscno ,  weg_htscno ,  mo_year , gen_name, gen_type, i_s, drawal, inj_volt, line_loss, ban_op, G_ALL_C1, G_ALL_C2, G_ALL_C4, G_ALL_C5, ALL_C1, ALL_C2, ALL_C4, ALL_C5, NOAD_C1, NOAD_C2, NOAD_C4, NOAD_C5, INTPK_C1_C2, INTPK_C2_C1, INTAD_C1_C5, INTAD_C1_C4, INTAD_C2_C5, INTAD_C2_C4, INTAD_C4_C5, CON_C1, CON_C2, CON_C4, CON_C5, BAL_C1, BAL_C2, BAL_C4, BAL_C5, BAL_NETC1, BAL_NETC2, BAL_NETC4, BAL_NETC5, W_CHRGS, css } = req.body;

      // Log the input for debugging
      // console.log("Inj_Volt:", Inj_Volt);
      // console.log("ID:", id);

      const sqlUpdate = `
          UPDATE tblhtledger 
          SET com_id  = ? ,  con_htscno  = ? ,  weg_htscno  = ? ,  mo_year  = ? , gen_name = ? , gen_type = ? , i_s = ? , drawal = ? , inj_volt = ? , line_loss = ? , ban_op = ? , G_ALL_C1 = ? , G_ALL_C2 = ? , G_ALL_C4 = ? , G_ALL_C5 = ? , ALL_C1 = ? , ALL_C2 = ? , ALL_C4 = ? , ALL_C5 = ? , NOAD_C1 = ? , NOAD_C2 = ? , NOAD_C4 = ? , NOAD_C5 = ? , INTPK_C1_C2 = ? , INTPK_C2_C1 = ? , INTAD_C1_C5 = ? , INTAD_C1_C4 = ? , INTAD_C2_C5 = ? , INTAD_C2_C4 = ? , INTAD_C4_C5 = ? , CON_C1 = ? , CON_C2 = ? , CON_C4 = ? , CON_C5 = ? , BAL_C1 = ? , BAL_C2 = ? , BAL_C4 = ? , BAL_C5 = ? , BAL_NETC1 = ? , BAL_NETC2 = ? , BAL_NETC4 = ? , BAL_NETC5 = ? , W_CHRGS = ? , css = ?  WHERE id = ?
      `;

      con.query(sqlUpdate, [com_id ,  con_htscno ,  weg_htscno ,  mo_year , gen_name, gen_type, i_s, drawal, inj_volt, line_loss, ban_op, G_ALL_C1, G_ALL_C2, G_ALL_C4, G_ALL_C5, ALL_C1, ALL_C2, ALL_C4, ALL_C5, NOAD_C1, NOAD_C2, NOAD_C4, NOAD_C5, INTPK_C1_C2, INTPK_C2_C1, INTAD_C1_C5, INTAD_C1_C4, INTAD_C2_C5, INTAD_C2_C4, INTAD_C4_C5, CON_C1, CON_C2, CON_C4, CON_C5, BAL_C1, BAL_C2, BAL_C4, BAL_C5, BAL_NETC1, BAL_NETC2, BAL_NETC4, BAL_NETC5, W_CHRGS, css , id], (err, result) => {
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
export const deletehtleadger = async (req, res) => {
  try {
      const id = req.params.id;

      // Step 1: Delete the record with the specified ID
      const deleteQuery = "DELETE FROM tblhtledger WHERE id = ?";
      
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
              const updateIdsQuery = "UPDATE tblhtledger SET id = @autoid := (@autoid + 1)";
              con.query(updateIdsQuery, (err) => {
                  if (err) {
                      console.error("Error updating IDs:", err);
                      return res.status(500).send("Error updating IDs");
                  }

                  // Step 4: Reset AUTO_INCREMENT to 1
                  const resetAutoIncrementQuery = "ALTER TABLE tblhtledger AUTO_INCREMENT = 1";
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

export const deletemonthhtleadger = async (req, res) => {
  try {
      const id = req.params.id;
      const id1= req.params.id1; 
      // console.log(id,id1);


      // Step 1: Delete the record with the specified ID
      const deleteQuery = "DELETE FROM tblhtledger WHERE mo_year = ? and 	con_htscno = ?";
      
      con.query(deleteQuery, [id,id1], (err, userData) => {
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
              const updateIdsQuery = "UPDATE tblhtledger SET id = @autoid := (@autoid + 1)";
              con.query(updateIdsQuery, (err) => {
                  if (err) {
                      console.error("Error updating IDs:", err);
                      return res.status(500).send("Error updating IDs");
                  }

                  // Step 4: Reset AUTO_INCREMENT to 1
                  const resetAutoIncrementQuery = "ALTER TABLE tblhtledger AUTO_INCREMENT = 1";
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
