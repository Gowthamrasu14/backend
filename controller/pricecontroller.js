import con from "../db.js"

export const getplantunitprice = async(req, res) =>{
    let dataall = "select * from tblplantunitprice";
    con.query(dataall,(err,allData)=>{
        if(err){ throw err  }
        res.send(allData);
    })
}

export const getoneplantunitprice = async(req, res) =>{
    let dataall = "select * from tblplantunitprice where date=(select max(date) as date from tblplantunitprice);";
    con.query(dataall,(err,allData)=>{
        if(err){ throw err  }
        res.send(allData);
       
    })
}

export const createplantunitprice = async (req, res) => {
    try {
      const { com_id,date, con_htscno, plant_htscno, normal, peak, night } = req.body;
  // 
//    console.log(JSON.stringify(req.body));
      con.query(
        "INSERT INTO `tblplantunitprice`(`com_id`,date, `con_htscno`, `plant_htscno`, `normal`, `peak`, `night`) VALUES (?,?,?,?,?,?,?)",
        [ com_id,date, con_htscno, plant_htscno, normal, peak, night ],
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
  export const updateplantunitprice = async (req, res) => {
    try {
        const { id } = req.params;  // Extract 'id' from request parameters
        const {  com_id,date, con_htscno, plant_htscno, normal, peak, night } = req.body;

        // Log the input for debugging
        // console.log("Inj_Volt:", Inj_Volt);
        // console.log("ID:", id);

        const sqlUpdate = `
            UPDATE tblplantunitprice 
            SET com_id = ?, date =?, con_htscno = ?, plant_htscno = ?, normal = ?, peak = ?, night = ?
            WHERE id = ?
        `;

        con.query(sqlUpdate, [ com_id,date, con_htscno, plant_htscno, normal, peak, night,  id], (err, result) => {
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
  export const deleteplantunitprice = async (req, res) => {
    try {
        const id = req.params.id;
  
        // Step 1: Delete the record with the specified ID
        const deleteQuery = "DELETE FROM tblplantunitprice WHERE id = ?";
        
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
                const updateIdsQuery = "UPDATE tblplantunitprice SET id = @autoid := (@autoid + 1)";
                con.query(updateIdsQuery, (err) => {
                    if (err) {
                        console.error("Error updating IDs:", err);
                        return res.status(500).send("Error updating IDs");
                    }
  
                    // Step 4: Reset AUTO_INCREMENT to 1
                    const resetAutoIncrementQuery = "ALTER TABLE tblplantunitprice AUTO_INCREMENT = 1";
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
  