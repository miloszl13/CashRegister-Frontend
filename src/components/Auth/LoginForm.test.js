import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import LoginForm from "./LoginForm";
import store from "../../store/index";
import { Provider } from "react-redux";
import { AuthContextProvider } from "../../store/auth-context";
import userEvent from '@testing-library/user-event';
import nock from 'nock'

const LoginFormMock = () => {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <LoginForm />
      </Provider>
    </AuthContextProvider>
  );
};

describe("LoginForm", () => {
  it("Should render login form", () => {
    render(<LoginFormMock />);

    const formElement = screen.getAllByText("Login");
    expect(formElement.length).toBe(2);
  });

  it("Click on input element should assign focus on it",()=>{
    render(<LoginFormMock/>);

    const inputElement = screen.getByLabelText('Username:');
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: '' } });
    userEvent.tab();
    expect(inputElement).toHaveFocus();
  });

  it("Login button should be disabled if inputs are empty",()=>{
   render(<LoginFormMock/>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();

  });

  it("If type something in username input but not in the password input,Login button should be disabled", () => {
    render(<LoginFormMock />);
    
    const inputElement = screen.getByLabelText('Username:');
    fireEvent.change(inputElement, { target: { value: 'milos123' } });
   
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  it("If type something in password input but not in the username input,Login button should be disabled", () => {
    render(<LoginFormMock />);
    
    const inputElement = screen.getByLabelText('Password:');
    fireEvent.change(inputElement, { target: { value: 'milos123' } });
   
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

   it("If type spmething in username and password inputs ,Login button should be enabled", () => {
    render(<LoginFormMock />);
    
    const inputElement = screen.getByLabelText('Username:');
    fireEvent.change(inputElement, { target: { value: 'milos123' } });
  

    const inputElement2=screen.getByLabelText('Password:');
    fireEvent.change(inputElement2, { target: { value: 'milos123' } });
   
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).not.toBeDisabled();
  });
  
  // //after loging in
  // it("If you entered some credentials of existing user ,it should send you to homepage",async () => {
  //   render(<LoginFormMock />);
  //   const scope = nock('https://localhost:7269').get('/api/User/GetUsersId/milos123').reply(200,1);
  //   const scope2 = nock('https://localhost:7269').post('/api/User/login',{username:'milos123',password:'milos123'}).reply(200,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Im1pbG9zMTIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6Im1paGFqbG92aWMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJhZG1pbiIsImV4cCI6MTY1NzI3OTk3NiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNDAiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM0MCJ9.2tVRECIXiDFChRG2rl3BVfv4n2HA3rf7A4Kl3fktAbY');
  //   const scope3 = nock('https://localhost:7269').get('/api/User/GetUserByCredentials',{username:'milos123',password:'milos123'}).reply(200,{firsName: "milos",
  //   id: 1,
  //   lastName: "mihajlovic",
  //   password: "milos123",
  //   role: "admin",
  //   username: "milos123"});
  //   const inputElement = screen.getByLabelText('Username:');
  //   fireEvent.change(inputElement, { target: { value: 'milos123' } });
  
  
  //   const inputElement2=screen.getByLabelText('Password:');
  //   fireEvent.change(inputElement2, { target: { value: '12345' } });
   
  //   const buttonElement = screen.getByRole('button');
    
  //   fireEvent.click(buttonElement);
    
  //   await expect(screen.getByTestId("login")).toBeInTheDocument();
  // });
    
   
   
});
