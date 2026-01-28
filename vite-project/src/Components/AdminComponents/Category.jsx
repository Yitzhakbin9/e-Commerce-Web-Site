import React from 'react'
import { useState } from "react"
import Button from '@mui/material/Button';
import categoriesRepo from '../../Repos/categoriesRepo.js'
import { CATEGORY_FIELDS } from '../../Constants/fields.js'
import '../../Css/styles.css';



const Category = ({ categoryInfo }) => {

  const [isUpdate, setIsUpdate] = useState(true)
  const [updatedName, setUpdatedName] = useState(false)


  function removeClick() {
    categoriesRepo.removeCategory(categoryInfo.id)
  }

  function updateClick() {
    setIsUpdate(!isUpdate)
    categoriesRepo.updateCategory(categoryInfo.id, updatedName)
  }


  return (
    <div style={{ border: "2px solid black", borderRadius: "40px" }}>

      {isUpdate ?
        categoryInfo[CATEGORY_FIELDS.NAME] :
        <input onChange={(e) => setUpdatedName(e.target.value)} type="text" />
      }
      <Button size="small" variant="outlined" onClick={updateClick}>Update</Button>
      <Button size="small" variant="outlined" onClick={removeClick}>Remove</Button>

      <br />
      <br />
    </div>
  )
}

export default Category