
// import React, { useState } from "react";
// import { NotationPost } from "@/types/api/notation";



// const Notation = () => {
//   const [comment, setComment] = useState<NotationPost[]>([])
//   const [notation, setNotation] = useState<NotationPost[]>([])

import React, { useState } from "react";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Notation } from "@/types/api/notation";
import { noteSomone } from "@/lib/notations"


const Notation = () => {
  const [notation, setNotation] = useState<number | null>(2);
  const [comment, setComment] = useState<string>("");

  const onSubmit

  

  
  return (
    <div>
      <Typography component="legend">Notation</Typography>
      <Rating
        name="notation"
        value={notation}
        onChange={handleNotationChange}
      />
      <br />
      <input
        type="text"
        placeholder="Laisser un commentaire"
        value={comment}
        onChange={handleCommentChange}
      />
      <br />
  
    </div>
  );
};
export default Notation;
