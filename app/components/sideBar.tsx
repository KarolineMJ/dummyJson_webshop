import { Filters } from './filters'
import TuneIcon from '@mui/icons-material/Tune'

import { Stack, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export function SideBar({
  category,
  setCategory,
}: {
  category: string
  setCategory: Dispatch<SetStateAction<string>>
}) {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{ minWidth: '250px', padding: '20px', backgroundColor: 'white' }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          borderBottom: '1px solid #ededed',
        }}
      >
        <Stack direction="row" gap={2} paddingBottom={2} alignItems="center">
          <TuneIcon />
          <Typography>Filters</Typography>
        </Stack>
      </Stack>
      <Filters setCategory={setCategory} category={category} />
    </Stack>
  )
}
