import React from 'react'
import { useState } from "react"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import categoriesRepo from '../../Repos/categoriesRepo.js'
import { CATEGORY_FIELDS } from '../../Constants/fields.js'
import '../../Css/styles.css';



const Category = ({ categoryInfo }) => {

  const [isUpdate, setIsUpdate] = useState(true)
  const [updatedName, setUpdatedName] = useState(categoryInfo[CATEGORY_FIELDS.NAME])


  function removeClick() {
    categoriesRepo.removeCategory(categoryInfo.id)
  }

  function updateClick() {
    if (!isUpdate && updatedName.trim()) {
      categoriesRepo.updateCategory(categoryInfo.id, updatedName)
    }
    setIsUpdate(!isUpdate)
  }


  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.15)',
          transform: 'translateY(-4px)',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {isUpdate ? (
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            {categoryInfo[CATEGORY_FIELDS.NAME]}
          </Typography>
        ) : (
          <TextField
            fullWidth
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:focus-within fieldset': { borderColor: '#667eea' },
              },
            }}
          />
        )}
        <Typography variant="caption" sx={{ color: '#999', display: 'block', mt: 1 }}>
          ID: {categoryInfo.id}
        </Typography>
      </CardContent>

      <CardActions sx={{ gap: 1, justifyContent: 'flex-end' }}>
        <Button
          size="small"
          variant={isUpdate ? "outlined" : "contained"}
          startIcon={isUpdate ? <EditIcon /> : <SaveIcon />}
          onClick={updateClick}
          sx={{
            textTransform: 'none',
            color: isUpdate ? '#667eea' : 'white',
            borderColor: '#667eea',
            background: isUpdate ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: isUpdate ? '#f0f0f0' : 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            }
          }}
        >
          {isUpdate ? 'Edit' : 'Save'}
        </Button>

        {!isUpdate && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => {
              setIsUpdate(true);
              setUpdatedName(categoryInfo[CATEGORY_FIELDS.NAME]);
            }}
            sx={{
              textTransform: 'none',
              color: '#999',
              borderColor: '#ccc'
            }}
          >
            Cancel
          </Button>
        )}

        <Button
          size="small"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={removeClick}
          sx={{
            textTransform: 'none',
            color: '#d32f2f',
            borderColor: '#d32f2f',
            '&:hover': {
              background: 'rgba(211, 47, 47, 0.04)'
            }
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Category