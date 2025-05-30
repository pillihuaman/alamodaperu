export interface RespStore {
  id: string;          // Unique ID generated by MongoDB
  name: string;        // Store name
  address: string;     // Store address
  country: string;     // Country where the store is located
  email: string;       // Contact email
  phone: string;       // Contact phone number
  status: string;      // Store status (active, inactive)
  ownerName: string;   // Store owner's name
}
