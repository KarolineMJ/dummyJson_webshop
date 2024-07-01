import { ProductType } from '@/app/components/products/productList'
import {
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
  Stack,
  Typography,
} from '@mui/material'

export interface SimpleDialogProps {
  open: boolean
  selectedProduct: ProductType
  onClose: () => void
}

export const ProductDetailsDialog = ({
  open,
  onClose,
  selectedProduct,
}: SimpleDialogProps) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack direction="row">
        <Stack>
          {selectedProduct.images.length > 0 && (
            <CardMedia
              image={selectedProduct.images[0]}
              sx={{
                height: 200,
                width: 200,
              }}
            />
          )}
        </Stack>
        <Stack>
          <DialogTitle>{selectedProduct.title}</DialogTitle>
          <DialogContent>
            <Typography>$ {selectedProduct.price}</Typography>
            <Rating value={selectedProduct.rating} readOnly precision={0.5} />
            <Typography>{selectedProduct.description}</Typography>
          </DialogContent>
        </Stack>
      </Stack>
    </Dialog>
  )
}
