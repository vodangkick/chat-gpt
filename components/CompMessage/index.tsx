'use client'
import { DocumentData } from "firebase/firestore"
import { useEffect } from "react";
import SyntaxHighlighter  from 'react-syntax-highlighter';
import { atomOneDark ,docco, darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import hljs from 'highlight.js';
import Parser from 'html-react-parser';
import Image from "next/dist/client/image";
import styles from './CompMessage.module.scss';
import imgUser from '../../images/user.png';
import { SiOpenai } from 'react-icons/si';
import { BiUserCircle } from 'react-icons/bi';



type Props = {
    message : DocumentData;
}

function Message({message}: Props) {
    const isChatGPT = message?.user?.name! === "chatGPT";
    const codeString :any = `import React, { useState } from 'react'; import './App.css'; const App = () => { const [todos, setTodos] = useState([]); const [inputValue, setInputValue] = useState(''); const handleInputChange = (event) => { setInputValue(event.target.value); }; const addTodo = () => { if (inputValue.trim() !== '') { setTodos([...todos, { text: inputValue }]); setInputValue(''); } }; const handleKeyPress = (event) => { if (event.key === 'Enter') { addTodo(); } }; const removeTodo = (index) => { const newTodos = [...todos]; newTodos.splice(index, 1); setTodos(newTodos); }; return ( <div className="App"> <h1>Todo App</h1> <input type="text" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} /> <button onClick={addTodo}>Add Todo</button> <ul> {todos.map((todo, index) => ( <li key={index}> {todo.text} <button onClick={() => removeTodo(index)}>Remove</button> </li> ))} </ul> </div> ); }; export default App; `;
    //const codeString2 : any = `Để viết một chức năng đăng nhập C# đơn giản, bạn có thể làm các bước sau đây: 1. Tạo form đăng nhập gồm hai trường nhập: tên đăng nhập và mật khẩu. 2. Viết mã C# để xử lý thông tin đăng nhập khi người dùng nhấn nút đăng nhập. Lúc này, mã C# sẽ đọc thông tin đăng nhập của người dùng và kiểm tra xem tên đăng nhập và mật khẩu có đúng không. Nếu thông tin đúng, chúng ta sẽ cho phép người dùng truy cập vào ứng dụng. 3. Chúng ta cũng có thể sử dụng lớp `SqlConnection` để kết nối với cơ sở dữ liệu và truy vấn để kiểm tra thông tin đăng nhập của người dùng. Dưới đây là một ví dụ về chức năng đăng nhập C# cơ bản: ```c# using System.Data.SqlClient; // Khi người dùng nhấn nút Đăng nhập private void btnLogin_click(object sender, EventArgs e) { // Lấy thông tin từ các trường đăng nhập string username = txtUsername.Text; string password = txtPassword.Text; // Tạo chuỗi kết nối với cơ sở dữ liệu string connString = @"Data Source=.\SQLEXPRESS;Initial Catalog=database_name;Integrated Security=True"; // Tạo kết nối với cơ sở dữ liệu SqlConnection conn = new SqlConnection(connString); conn.Open(); // Tạo câu truy vấn kiểm tra thông tin đăng nhập của người dùng string sql = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'"; SqlCommand command = new SqlCommand(sql, conn); SqlDataReader reader = command.ExecuteReader(); // Nếu thông tin đăng nhập đúng, đưa người dùng đến trang chính if (reader.Read()) { this.Hide(); MainForm mainForm = new MainForm(); mainForm.ShowDialog(); this.Close(); } else { MessageBox.Show("Tên đăng nhập hoặc mật khẩu không đúng."); } // Đóng kết nối reader.Close(); conn.Close(); } ``` Trong ví dụ trên, chúng tôi lấy thông tin từ các trường đăng nhập và tạo chuỗi kết nối với cơ sở dữ liệu. Sau đó, chúng tôi tạo kết nối đến cơ sở dữ liệu và thực hiện một câu truy vấn để kiểm tra thông tin đăng nhập của người dùng. Nếu thông tin đúng, ứng dụng sẽ đưa người dùng đến trang chính. Nếu thông tin sai, chúng tôi sẽ hiển thị một thông báo lỗi.`;
    //let highlightedCode : any = hljs.highlight(message.text , {language: '```'}).value
    // let highlightedCode : any = hljs.highlightAuto(message.text).value;
    // highlightedCode = Parser(highlightedCode);
        
    //const  listLang = hljs.getLanguage('javascript');
    // const parser = new DOMParser();
    // const html :any = parser.parseFromString(highlightedCode, 'text/html');
    //const myArray = message.text.split("```");
    //const newArray = myArray.map((item: any) => {
        // let highlightedCode : any = hljs.highlightAuto(item, 
        //     ['javascript','jsx','html','c#','php']
        //     ).language
        // highlightedCode = Parser(highlightedCode);
        // return highlightedCode
        //let arrayItem = item.split(" ");
        ////console.log(arrayItem[0],'text');
        //let highlightedCode : string = hljs.highlight(codeString , {language: arrayItem[0]}).value
        
        //console.log(highlightedCode);
        // if(highlightedCode){
        //     return highlightedCode
        // }
    //})
    //console.log(newArray);

    return (
        <div className={`${styles.chatMessage} py-5 ${isChatGPT && `bgMessChat ${styles.messOfChat}`}`}>
            <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
                    { isChatGPT ? (
                        <div className={`${styles.messAvata}`}>
                            <SiOpenai className="h-7 w-5"/>
                        </div>
                        ) : (

                        <div className={`${styles.messAvata}`}>
                            <BiUserCircle className="h-7 w-5" />
                            {/* <Image src={imgUser} alt="" width={32} height={32}/> */}
                        </div>
                    )}
                    {/* {highlightedCode} */}
                <p className="pt-1 text-sm leading-loose" style={{whiteSpace: 'break-spaces',lineHeight: '18px' }}>
                    {message.text}
                </p>
                {/* <div>
                    {newArray.map((item : string, index : number) => <p className="" key={index}>{item}</p>)}
                </div> */}
                {/* <div className="pt-1 text-sm leading-loose" style={{whiteSpace: 'break-spaces',lineHeight: '18px' }}>
                    {newArray.map((item : string, index : number) => <p className="" key={index}>{item}</p>)}
                </div> */}
                 {/* <p className="pt-1 text-sm leading-loose" style={{whiteSpace: 'break-spaces',lineHeight: '18px' }}>
                    {highlightedCode}
                </p> */}
                {/* <div>
                    {newArray.map((item : string, index : number) => <p key={index}>{item}</p>)}
                </div> */}
            </div>
           
            
            {/* <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
                <img src="https://links.papareact.com/2i6" alt="" className="h-8 w-8"/>
                <div className="pt-1 text-sm place-items-center">
                    <SyntaxHighlighter language="tsx" style={atomOneDark}>
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </div> */}
            
        </div>
    )
}

export default Message
