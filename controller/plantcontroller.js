import con from "../db.js";

export const getplant = async (req, res) => {
  let chrgsall =
    "select * from tblplant ORDER by priority ASC, doc DESC, weg_htscno ASC";
  con.query(chrgsall, (err, userData) => {
    if (err) {
      throw err;
    }
    res.send(userData);
  });
};

//SELECT SINGLE DATA
export const getOneplant = async (req, res) => {
  try {
    const id = req.params.id;
    let conall = "select *  from tblplant where id = " + id;
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


export const createplant = async (req, res) => {
  try {
    const {com_id,con_htscno,gen_name,weg_htscno,doc,gen_type,inj_volt,ban_op,priority,fromdate,todate,user,date_time} = req.body;
//  console.log(req.body);
    con.query(
      "INSERT INTO tblplant(com_id, con_htscno, gen_name, weg_htscno, doc, gen_type, inj_volt, ban_op, priority,fromdate,todate, user, date_time) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [com_id,con_htscno,gen_name,weg_htscno,doc,gen_type,inj_volt,ban_op,priority,fromdate,todate,user,date_time],
      (err, result) => {
        if (err) throw err;
        res.json({ message: "Data added successfully", id: result.insertId });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const formatDate1 = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const createplantexcel = async (req, res) => {
  try {
    const plants = req.body;
    // console.log(req.body);
    if (!Array.isArray(plants) || plants.length === 0) {
      return res.status(400).json({ error: "Invalid data format. Expecting an array of objects." });
    }

    const columns = [
      "com_id",
      "con_htscno",
      "gen_name",
      "weg_htscno",
      "doc",
      "gen_type",
      "inj_volt",
      "ban_op",
      "priority",
      "fromdate",
      "todate",
      "user",
      "date_time",
    ];

    const values = plants.map((row) =>
      columns.map((col) => {
        if (["doc", "fromdate", "todate", "date_time"].includes(col) && row[col]) {
          return formatDate1(row[col]);
        }
        return row[col] || null;
      })
    );

    const placeholders = plants
      .map(() => `(${columns.map(() => "?").join(", ")})`)
      .join(", ");

    const query = `
      INSERT INTO tblplant (${columns.join(", ")}) 
      VALUES ${placeholders} 
      ON DUPLICATE KEY UPDATE 
        gen_name=VALUES(gen_name), 
        weg_htscno=VALUES(weg_htscno), 
        doc=VALUES(doc), 
        gen_type=VALUES(gen_type), 
        inj_volt=VALUES(inj_volt), 
        ban_op=VALUES(ban_op), 
        priority=VALUES(priority), 
        fromdate=VALUES(fromdate),
        todate=VALUES(todate),
        user=VALUES(user), 
        date_time=VALUES(date_time)
    `;
console.log(query);
    con.query(query, values.flat(), (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ error: "Database error", details: err });
      }
      res.json({
        message: "Data added successfully",
        insertedRows: result.affectedRows,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE DATA
export const updateplant = async (req, res) => {
  try {
    const { id } = req.params; // Extract 'id' from request parameters
    const {
      com_id,
      con_htscno,
      gen_name,
      weg_htscno,
      doc,
      gen_type,
      inj_volt,
      ban_op,
      priority,
    } = req.body;

    // Log the input for debugging
    // console.log("Inj_Volt:", Inj_Volt);
    // console.log("ID:", id);

    const sqlUpdate = `
          UPDATE tblplant 
          SET com_id = ?,con_htscno = ?,gen_name = ?,weg_htscno = ?,doc = ?,gen_type = ?,inj_volt = ?,ban_op = ?,priority = ?  WHERE id = ?
      `;

    con.query(
      sqlUpdate,
      [
        com_id,
        con_htscno,
        gen_name,
        weg_htscno,
        doc,
        gen_type,
        inj_volt,
        ban_op,
        priority,
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
export const deleteplant = async (req, res) => {
  try {
    const id = req.params.id;

    // Step 1: Delete the record with the specified ID
    const deleteQuery = "DELETE FROM tblplant WHERE id = ?";

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
          "UPDATE tblplant SET id = @autoid := (@autoid + 1)";
        con.query(updateIdsQuery, (err) => {
          if (err) {
            console.error("Error updating IDs:", err);
            return res.status(500).send("Error updating IDs");
          }

          // Step 4: Reset AUTO_INCREMENT to 1
          const resetAutoIncrementQuery =
            "ALTER TABLE tblplant AUTO_INCREMENT = 1";
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
