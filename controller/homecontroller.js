import db from "../db.js";

export const consumption = async (req, res) => {
  const com_id = req.query.com_id;
  const htscno = req.query.htscno;

  const sql1 = `
    SELECT 
      SUM(c1 + c2 + c4 + c5) AS c_tot, 
      SUM(c_c1 + c_c2 + c_c4 + c_c5) AS c_c_tot 
    FROM tblconread 
    WHERE com_id = ? AND con_htscno = ?
  `;

  db.query(sql1, [com_id, htscno], (err, result1) => {
    if (err) return res.status(500).json({ error: "Error in SQL 1", details: err });

    if (result1.length === 0) return res.json([]);

    const { c_tot = 0, c_c_tot = 0 } = result1[0]; // default to 0 if null

    const sql2 = `
      SELECT 
        SUM(ALL_C1 + ALL_C2 + ALL_C4 + ALL_C5) AS TALL, 
        SUM(NOAD_C1 + NOAD_C2 + NOAD_C4 + NOAD_C5) AS TNOAD, 
        SUM(BAL_C1 + BAL_C2 + BAL_C4 + BAL_C5) AS TBAL, 
        SUM(BAL_NETC1 + BAL_NETC2 + BAL_NETC4 + BAL_NETC5) AS TBALNET, 
        SUM(
          INTPK_C1_C2 + INTPK_C2_C1 +   
          INTAD_C1_C5 + INTAD_C1_C4 + 
          INTAD_C2_C5 + INTAD_C2_C4 + 
          INTAD_C4_C5
        ) AS TNOAD_TOTAL
      FROM tblhtledger 
      WHERE com_id = ? AND con_htscno = ?
    `;

    db.query(sql2, [com_id, htscno], (err, result2) => {
      if (err) return res.status(500).json({ error: "Error in SQL 2", details: err });

      if (result2.length === 0) return res.json([]);

      const {
        TALL = 0,
        TBAL = 0,
        TBALNET = 0,
        TNOAD_TOTAL = 0
      } = result2[0]; // default to 0 if null

      const data = [
        { label: "CONSUMPTION", value: c_tot },
        { label: "ALLOTMENT", value: TALL },
        { label: "ADJUSTMENT", value: TNOAD_TOTAL },
        { label: "RETURN UNITS", value: TBAL },
        { label: "GEN END BANKING", value: TBALNET },
        { label: "BILLED UNIT", value: c_c_tot }
      ];

      res.json(data);
    });
  });
};
