import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../../api";

export const fetchInvoices = createAsyncThunk(
  "invoice/fetchInvoices",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("Token bulunamadı, lütfen giriş yapın.");
      }

      const response = await postData(
        "/invoice/search",
        {
          companyId: "01c880ca-46b5-4699-a477-616b84770071",
          documentType: "OUTGOING",
          endDate: "2025-07-04T08:31:10.422Z",
          page: 0,
          size: 20,
          startDate: "2025-06-27T00:00:00.000Z",
          referenceDocument: "",
          type: null,
          status: null,
          paymentStatus: null,
          isDeleted: false,
        },
        {
          headers: {
            "R-Auth": token,
          },
        }
      );

      //console.log("API Response:", response);

      if (response && response.data) {
        return response.data;
      }

      return response;
    } catch (error) {
      console.error("Error fetching invoices:", error);
      return rejectWithValue(
        error.response?.data || "Faturalar çekilirken hata oluştu"
      );
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoices: [],
    loading: false, 
    error: null, 
    selectedInvoice: null, 
  },
  reducers: {
    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
    },
    clearInvoices: (state) => {
      state.invoices = [];
      state.error = null;
      state.selectedInvoice = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      // İstek Başladı
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // İstek Başarılı
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload.invoices.content;
      })
      // İstek Hatalı
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearInvoices,setSelectedInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
