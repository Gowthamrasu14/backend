import con from "../admindb.js"

export const getcharges = async(req, res) =>{
    let chrgsall = "select * from tblcharges";
    con.query(chrgsall,(err,userData)=>{
        if(err){ throw err  }
        res.send(userData);
    })
}


export const getupdatecharges = async(req, res) =>{
    let dataall = "select * from tblcharges where date=(select max(date) as date from tblcharges);";
    con.query(dataall,(err,allData)=>{
        if(err){ throw err  }
        res.send(allData);
       
    })
}

export const createcharges = async (req, res) => {
    try {
      const { date, plantname, w_chrgs, CSS_1A, CSS_2A, CSS_2B, CSS_3, CSS_5 } = req.body;
  // 
  // console.log(date);
      con.query(
        "INSERT INTO `tblcharges`( `date`, `plantname`, `w_chrgs`, `CSS_1A`, `CSS_2A`, `CSS_2B`, `CSS_3`, `CSS_5`) VALUES (?,?,?,?,?,?,?,?)",
        [ date, plantname, w_chrgs, CSS_1A, CSS_2A, CSS_2B, CSS_3, CSS_5],
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
  export const updatecharges = async (req, res) => {
    try {
        const { id } = req.params;  // Extract 'id' from request parameters
        const {  date, plantname, w_chrgs, CSS_1A, CSS_2A, CSS_2B, CSS_3, CSS_5 } = req.body;

        // Log the input for debugging
        // console.log("Inj_Volt:", Inj_Volt);
        // console.log("ID:", id);

        const sqlUpdate = `
            UPDATE tblcharges 
            SET date = ?, plantname = ?, w_chrgs = ?, CSS_1A = ?, CSS_2A = ?, CSS_2B = ?, CSS_3 = ?, CSS_5 = ? 
            WHERE id = ?
        `;

        con.query(sqlUpdate, [ date, plantname, w_chrgs, CSS_1A, CSS_2A, CSS_2B, CSS_3, CSS_5, id], (err, result) => {
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
  export const deletecharges = async (req, res) => {
    try {
        const id = req.params.id;
  
        // Step 1: Delete the record with the specified ID
        const deleteQuery = "DELETE FROM tblcharges WHERE id = ?";
        
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
                const updateIdsQuery = "UPDATE tblcharges SET id = @autoid := (@autoid + 1)";
                con.query(updateIdsQuery, (err) => {
                    if (err) {
                        console.error("Error updating IDs:", err);
                        return res.status(500).send("Error updating IDs");
                    }
  
                    // Step 4: Reset AUTO_INCREMENT to 1
                    const resetAutoIncrementQuery = "ALTER TABLE tblcharges AUTO_INCREMENT = 1";
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
  