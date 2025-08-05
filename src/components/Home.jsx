import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import Web3 from "web3";
import "../App.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";

const Home = () => {
  const [userId, setUserId] = useState("");
  const [newAccount, setNewAccount] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState("ETH");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(1);
  const [amount, setAmount] = useState(1);
  const [open, setOpen] = useState(false);
  const [staking, setStaking] = useState([]);
  const [stakeHistory, setStakeHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("home");

  const navigate = useNavigate();
  const goToDeposit = () => {
    navigate("/staking/deposit", { state: userId });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={() => setActiveTab("home")}>
            User Wallets
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link onClick={goToDeposit}>Deposit</Nav.Link>
              <Nav.Link onClick={() => navigate("/staking/withdraw")}>
                Withdraw
              </Nav.Link>

              {activeTab === "home" && <Button>Stake Details</Button>}
              {activeTab === "stake" && (
                <Button onClick={() => setActiveTab("home")}>
                  Back to home
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <Nav.Link
              onClick={handleLogout}
              id="logout"
              className="bg-warning text-dark"
            >
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Home;
