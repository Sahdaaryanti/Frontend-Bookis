import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavbarUsers from "./components/members/Navbar";
import Footer from "./components/members/Footer";
import Dashboard from "./pages/members/Dashboard";
import KategoriBuku from "./pages/members/KategoriBuku";
import BukuPopuler from "./pages/members/BukuPopuler";
import BukuRekomendasi from "./pages/members/BukuRekomendasi";
import Register from "./pages/members/Register";
import Login from "./pages/members/Login";
import DetailUser from "./pages/members/DetailUser";
import UpdateDetailUserForm from "./pages/members/FormAkun";
import DetailBuku from "./pages/members/DetailBuku";
import PrivacyPolicy from "./pages/members/PrivacyPolice";
import AboutUs from "./pages/members/AboutUs";
import PaymentPage from "./pages/members/PaymentPage";
import Shop from "./pages/members/riwayatPesanan";
import ShopDetails from "./pages/members/detailRiwayatPesanan"
import Keranjang from "./pages/members/keranjang"
import CheckOut from "./pages/members/Checkout";
import PaymentComponent from "./pages/members/Payment";

function AppUsers() {
  return (
    <>
        <Router>
          <NavbarUsers />
          {/* <Footer />  */}
            <Routes>
                <Route path={"users/dashboard"} element={<Dashboard />} />
                <Route path={"users/kategori-buku"} element={<KategoriBuku />} />
                <Route path={"users/buku-populer"} element={<BukuPopuler/>} />
                <Route path={"users/buku-rekomendasi"} element={<BukuRekomendasi/>} />
                <Route path={"users/registrasi"} element={<Register />} />
                <Route path={"users/login"} element={<Login />} />
                <Route path={"users/detail-user"} element={<DetailUser/>} />
                <Route path={"users/form-akun"} element={<UpdateDetailUserForm/>} />
                <Route path={"users/detail-buku/:id"} element={<DetailBuku />} />
                <Route path={"users/privacy-policy"} element={<PrivacyPolicy />} />
                <Route path={"users/about-us"} element={<AboutUs />} />
                <Route path={"users/payment-page"} element={<PaymentPage />} />
                <Route path={"users/shop"} element={<Shop />}/>
                <Route path={"users/shop/:id"} element={<ShopDetails />}/>
                <Route path={"users/keranjang"} element={<Keranjang />} />
                <Route path={"users/checkout"} element={<CheckOut />} />
                <Route path={"/users/payment"} element={<PaymentComponent />} />
            </Routes>
          <Footer /> 
        </Router>
    </>
  )
}

export default AppUsers;