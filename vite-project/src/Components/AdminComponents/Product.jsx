import '../../Css/styles.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { PRODUCTS_FIELDS } from '../../Constants/fields.js';

const Product = ({ productInfo }) => {

  return (
    <Card
      sx={{
        width: '250px',
        height: '400px',
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
      {productInfo[PRODUCTS_FIELDS.IMG_URL] && (
        <CardMedia
          component="img"
          height="150"
          image={productInfo[PRODUCTS_FIELDS.IMG_URL]}
          alt={productInfo[PRODUCTS_FIELDS.NAME]}
          sx={{ objectFit: 'cover', flexShrink: 0, width: '100%' }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#333', mb: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {productInfo[PRODUCTS_FIELDS.NAME]}
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 2, height: '40px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {productInfo[PRODUCTS_FIELDS.DESCRIPTION]}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', marginTop: 'auto' }}>
          <Chip
            label={`$${productInfo[PRODUCTS_FIELDS.PRICE]}`}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: 600
            }}
          />
          <Chip
            label={`Stock: ${productInfo[PRODUCTS_FIELDS.STOCK_QTY]}`}
            variant="outlined"
            sx={{ borderColor: '#667eea', color: '#667eea' }}
          />
          <Chip
            label={productInfo[PRODUCTS_FIELDS.IS_ACTIVE] ? 'Active' : 'Inactive'}
            sx={{
              background: productInfo[PRODUCTS_FIELDS.IS_ACTIVE] ? '#4caf50' : '#f44336',
              color: 'white',
              fontWeight: 600
            }}
          />
        </Box>

        <Typography variant="caption" sx={{ color: '#999' }}>
          ID: {productInfo.id}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Product
