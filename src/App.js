import { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import BillForm from './components/Bill/BillForm';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [billForm,setOpetBillForm]=useState(false);
  const [billButton,setBillButton]=useState(false);


  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  
  const onOpenBillForm=()=>{
    setOpetBillForm(true);
  }
  const onCloseBillForm=()=>{
    setOpetBillForm(false);
  }
  const onCreateBill=()=>{
    setBillButton(true);
    console.log('hi')
    console.log(billButton)
    setOpetBillForm(false);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} onShowCreateBill={onOpenBillForm} showBillButton={billButton}/>
      <main>
        <Meals />
        {billForm && <BillForm onClose={onCloseBillForm} onCreate={onCreateBill}/>}
      </main>
    </CartProvider>
  );
}

export default App;
