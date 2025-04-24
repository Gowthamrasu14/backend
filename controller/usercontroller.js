import con from "../db.js";

export const getuser = async (req, res) => {
  let chrgsall =
    "select * from tbluser ORDER by DOJ ASC";
  con.query(chrgsall, (err, userData) => {
    if (err) {
      throw err;
    }
    res.send(userData);
  });
};



// backend: userController.js or wherever your controller is




export const getselecteduser = async(req, res) =>{
  // console.log(req.params.id);
  // console.log(req.params.id1);
  let chrgsall = "SELECT * FROM tbluser WHERE BINARY username = '" + req.params.id + "' AND BINARY password = '" + req.params.id1 + "'";
  con.query(chrgsall,(err,userData)=>{
      if(err){ throw err  }
      // console.log(userData);
      res.send(userData);
  })
}



//SELECT SINGLE DATA
export const getOneuser = async (req, res) => {
  try {
    const id = req.params.id;
    let conall = "select *  from tbluser where id = " + id;
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


export const createuser = async (req, res) => {
  try {
    const {empname, empcode, doj, dest, username, password, utype, valupto, img, user, datetime} = req.body;
 console.log(req.body);
 console.log("hi");
    con.query(
      "INSERT INTO `tbluser`(`empname`, `empcode`, `doj`, `dest`, `username`, `password`, `utype`, `valupto`, `img`, `user`, `date_time`) VALUES  (?,?,?,?,?,?,?,?,?,?,?)",
      [empname, empcode, doj, dest, username, password, utype, valupto, img, user, datetime],
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
export const updateuser = async (req, res) => {
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
          UPDATE tbluser 
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
export const deleteuser = async (req, res) => {
  try {
    const id = req.params.id;

    // Step 1: Delete the record with the specified ID
    const deleteQuery = "DELETE FROM tbluser WHERE id = ?";

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
          "UPDATE tbluser SET id = @autoid := (@autoid + 1)";
        con.query(updateIdsQuery, (err) => {
          if (err) {
            console.error("Error updating IDs:", err);
            return res.status(500).send("Error updating IDs");
          }

          // Step 4: Reset AUTO_INCREMENT to 1
          const resetAutoIncrementQuery =
            "ALTER TABLE tbluser AUTO_INCREMENT = 1";
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
