import { Button, MenuItem, MenuList, Stack, Typography } from '@mui/material'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function Filters({
  setCategory,
  category,
}: {
  setCategory: Dispatch<SetStateAction<string>>
  category: string
}) {
  const [filters, setFilters] = useState([])

  useEffect(() => {
    getAllProductList()
  }, [])

  const getAllProductList = async () => {
    const response = await axios.get(
      'https://dummyjson.com/products/category-list',
    )

    setFilters(response.data)
  }

  return (
    <>
      <MenuList>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          sx={{ marginBottom: 1 }}
        >
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ alignSelf: 'center', padding: '10px 0' }}
          >
            Categories
          </Typography>
          {category !== '' && (
            <Button size="small" onClick={() => setCategory('')}>
              Clear
            </Button>
          )}
        </Stack>
        {filters.map((filter: string, index: number) => {
          return (
            <MenuItem
              key={index}
              onClick={() => setCategory(filter === category ? '' : filter)}
              selected={filter === category}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: filter === category ? 'bold' : 'normal' }}
              >
                {filter}
              </Typography>
            </MenuItem>
          )
        })}
      </MenuList>
    </>
  )
}
