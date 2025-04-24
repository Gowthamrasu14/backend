import con from "../db.js";

export const getplantread = async (req, res) => {
  let chrgsall = "select * from tblplantread";
  con.query(chrgsall, (err, userData) => {
    if (err) {
      throw err;
    }
    res.send(userData);
  });
};

export const getmaxplantread = async (req, res) => {
  try {
    const id = req.params.id;
    let conall =
      "SELECT * FROM `tblplantread` WHERE `mo_year`=(SELECT max(mo_year) as mo_year FROM `tblplantread`)";
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
export const getOneplantread = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    let conall = "select *  from tblplantread where mo_year = '" + id + "'";
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

const formatDate1 = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const createplantread1 = async (req, res) => {
  const data = req.body;

  if (!Array.isArray(data)) {
    return res
      .status(400)
      .json({ error: "Invalid data format. Expected an array." });
  }

  try {
    const insertPromises = data.map((entry) => {
      return new Promise((resolve, reject) => {
        const {
          PLANTHTSCNO,
          DATE,
          C1,
          C2,
          C4,
          C5,
          AMR,
          OM,
          TRANS,
          SOC,
          RKVAH,
          IEC,
          SCH,
          OTHER,
          DSM,
        } = entry;

        // Ensure SCH and OTHER are not null
        const schValue = SCH ?? 0;
        const otherValue = OTHER ?? 0;

        // Convert DATE to MySQL Date format (YYYY-MM-DD)
        const formattedDate = formatDate1(DATE);

        // Execute DELETE query before inserting new record
        con.query(
          "DELETE FROM `tblplantread` WHERE `planthtscno` = ? AND `mo_year` = ?",
          [PLANTHTSCNO, formattedDate],
          (deleteErr) => {
            if (deleteErr) {
              return reject(deleteErr);
            }

            // Execute INSERT query
            con.query(
              "INSERT INTO `tblplantread` (`planthtscno`, `mo_year`, `c1`, `c2`, `c4`, `c5`, `cc1`, `cc2`, `cc4`, `cc5`, `amr`, `om`, `trans`, `soc`, `rkvah`, `iec`, `sch`, `other`, `dsm`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [
                PLANTHTSCNO,
                formattedDate,
                C1,
                C2,
                C4,
                C5,
                C1,
                C2,
                C4,
                C5,
                AMR,
                OM,
                TRANS,
                SOC,
                RKVAH,
                IEC,
                schValue,
                otherValue,
                DSM,
              ],
              (insertErr, insertResult) => {
                if (insertErr) {
                  return reject(insertErr);
                }
                resolve({ insertId: insertResult.insertId });
              }
            );
          }
        );
      });
    });

    await Promise.all(insertPromises);

    // Step 1: Reset @autoid variable
    const setAutoidQuery = "SET @autoid = 0";
    con.query(setAutoidQuery, (err) => {
      if (err) {
        console.error("Error setting @autoid:", err);
        return res.status(500).json({ error: "Error setting @autoid" });
      }

      // Step 2: Update IDs sequentially
      const updateIdsQuery =
        "UPDATE tblplantread SET id = @autoid := (@autoid + 1)";
      con.query(updateIdsQuery, (err) => {
        if (err) {
          console.error("Error updating IDs:", err);
          return res.status(500).json({ error: "Error updating IDs" });
        }

        // Step 3: Reset AUTO_INCREMENT
        const resetAutoIncrementQuery =
          "ALTER TABLE tblplantread AUTO_INCREMENT = 1";
        con.query(resetAutoIncrementQuery, (err) => {
          if (err) {
            console.error("Error resetting AUTO_INCREMENT:", err);
            return res
              .status(500)
              .json({ error: "Error resetting AUTO_INCREMENT" });
          }

          res.json({ message: "Data added successfully" });
        });
      });
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// INSERT DATA

export const createplantread = async (req, res) => {
  try {
    const {
      htscno,
      date,
      c1,
      c2,
      c3,
      c4,
      c5,
      amr,
      om,
      trans,
      soc,
      rkvah,
      iec,
      sch,
      other,
      dsm,
    } = req.body;

    con.query(
      "INSERT INTO `tblplantread`( `planthtscno`, `mo_year`, `c1`, `c2`, `c3`, `c4`, `c5`, `cc1`, `cc2`, `cc3`, `cc4`, `cc5`, `amr`, `om`, `trans`, `soc`, `rkvah`, `iec`, `sch`, `other`, `dsm`) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        htscno,
        date,
        c1,
        c2,
        c3,
        c4,
        c5,
        c1,
        c2,
        c3,
        c4,
        c5,
        amr,
        om,
        trans,
        soc,
        rkvah,
        iec,
        sch,
        other,
        dsm,
      ],
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
export const updateplantread = async (req, res) => {
  try {
    const { id } = req.params; // Extract 'id' from request parameters
    const {
      htscno,
      date,
      c1,
      c2,
      c3,
      c4,
      c5,
      amr,
      om,
      trans,
      soc,
      rkvah,
      iec,
      sch,
      other,
      dsm,
    } = req.body;

    // Log the input for debugging
    // console.log("Inj_Volt:", Inj_Volt);
    // console.log("ID:", id);

    const sqlUpdate = `
          UPDATE tblplantread 
          SET planthtscno= ? , mo_year= ? , c1= ? , c2= ? , c3= ? , c4= ? , c5= ? , cc1= ? , cc2= ? , cc3= ? , cc4= ? , cc5= ? , amr= ? , om= ? , trans= ? , soc= ? , rkvah= ? , iec= ? , sch= ? , other= ? , dsm = ?  WHERE id = ?
      `;

    con.query(
      sqlUpdate,
      [
        htscno,
        date,
        c1,
        c2,
        c3,
        c4,
        c5,
        c1,
        c2,
        c3,
        c4,
        c5,
        amr,
        om,
        trans,
        soc,
        rkvah,
        iec,
        sch,
        other,
        dsm,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Error updating record:", err);
          return res.status(500).json({ error: "Error updating record" });
        }

        res.json({ message: "Record updated successfully", result });
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE DATA
export const deleteplantread = async (req, res) => {
  try {
    const id = req.params.id;

    // Step 1: Delete the record with the specified ID
    const deleteQuery = "DELETE FROM tblplantread WHERE id = ?";

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
        const updateIdsQuery =
          "UPDATE tblplantread SET id = @autoid := (@autoid + 1)";
        con.query(updateIdsQuery, (err) => {
          if (err) {
            console.error("Error updating IDs:", err);
            return res.status(500).send("Error updating IDs");
          }

          // Step 4: Reset AUTO_INCREMENT to 1
          const resetAutoIncrementQuery =
            "ALTER TABLE tblplantread AUTO_INCREMENT = 1";
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

export const deletemonthplantread = async (req, res) => {
  try {
    const id = req.params.id;

    // Step 1: Delete the record with the specified ID
    const deleteQuery = "DELETE FROM tblplantread WHERE mo_year = ?";

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
        const updateIdsQuery =
          "UPDATE tblplantread SET id = @autoid := (@autoid + 1)";
        con.query(updateIdsQuery, (err) => {
          if (err) {
            console.error("Error updating IDs:", err);
            return res.status(500).send("Error updating IDs");
          }

          // Step 4: Reset AUTO_INCREMENT to 1
          const resetAutoIncrementQuery =
            "ALTER TABLE tblplantread AUTO_INCREMENT = 1";
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
