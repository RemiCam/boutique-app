import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../../config/apiConfig';
import { ItemsArraySchema, ItemSchema } from '../../schemas/itemSchemas';

// Fetch all items with Zod validation
export const fetchItems = createAsyncThunk('items/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    const data = await response.json();
    
    // Validate with Zod
    const result = ItemsArraySchema.safeParse(data);
    if (!result.success) {
      console.error('Validation errors:', result.error.format());
      return rejectWithValue('Invalid data format from server');
    }
    
    return result.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Create item with Zod validation
export const createItem = createAsyncThunk('items/create', async (newItem, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    if (!response.ok) {
      throw new Error('Failed to create item');
    }
    const data = await response.json();
    
    // Validate response
    const result = ItemSchema.safeParse(data);
    if (!result.success) {
      console.error('Validation errors:', result.error.format());
      return rejectWithValue('Invalid response data');
    }
    
    return result.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Update item with Zod validation
export const updateItem = createAsyncThunk('items/update', async ({ id, updates }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update item');
    }
    const data = await response.json();
    
    // Validate response
    const result = ItemSchema.safeParse(data);
    if (!result.success) {
      console.error('Validation errors:', result.error.format());
      return rejectWithValue('Invalid response data');
    }
    
    return result.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Delete item
export const deleteItem = createAsyncThunk('items/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete item');
    }
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create item
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update item
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete item
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default itemsSlice.reducer;