import { withUt } from "uploadthing/tw";

export default withUt({
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [],
});
