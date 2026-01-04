import '../../Css/styles.css';
import TextField from '@mui/material/TextField';
import GenericTableComponent from '../GenericTableComponent.jsx';

const Product = ({ productInfo }) => {

  const tableRow2 = [
    { prod: 'Watch', qty: '1', d: '1/1/23' },
    { prod: 'Watch', qty: '1', d: '1/1/23' },
    { prod: 'Watch', qty: '1', d: '1/1/23' }
  ];

  const headers2 = [
    { key: "prod", label: "Products" },
    { key: "qty", label: "Qty" },
    { key: "d", label: "Date" }
  ];



  return (

    <div
      style={{
        display: 'flex',
        gap: '40px',
        border: '2px solid black',
        borderRadius: '40px',
        padding: '10px',
      }}>


      {/* LEFT SIDE */}
      <div style={{ flex: 1 }}>

        <br />
        Title: <TextField
          disabled
          id="outlined-disabled"
          defaultValue={productInfo.title}
          size='small'
        />
        <br />
        Price: <TextField
          disabled
          id="outlined-disabled"
          defaultValue={productInfo.price}
          size='small'
        />
        <br />
        Category: <TextField
          disabled
          id="outlined-disabled"
          defaultValue={productInfo.category}
          size='small'
        />
        <br />
      </div>

      {/* RIGHT SIDE */}
      <div style={{ flex: 1 }}>



        Description: <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue={productInfo.description}
        />
        <br />

      </div>


      Link To Pic: <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows={4}
        defaultValue={productInfo.pic}
      />
      <br />
      Bought By:
      <GenericTableComponent headers={headers2} tableRow={tableRow2}/>





    </div>

  )
}

export default Product