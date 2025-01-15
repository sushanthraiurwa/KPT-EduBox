import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/header/Header';
import Footer from './pages/footer/Footer';
import Home from './pages/home/Home';
import Notes from './pages/Notes/Note'; 
import QuestionPapers from './pages/QuestionPapers/QuestionPapers';
import NotesLogin from './pages/Notes/NotesLogin';
import QuestionPapersLogin from './pages/QuestionPapers/QuestionPapersLogin'
import About from './pages/About/About';
import ContactUs from './pages/Contact/Contact';
import NotesAdmin from './pages/Notes/NotesAdmin';


import QuestionPaperAdmin from './pages/QuestionPapers/QuestionPaperAdmin';
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        
        <Route path="/notes/login" element={<NotesLogin />} />
        <Route path="/questionpaper" element={<QuestionPapers />} />
        <Route path="/questionpaper/login" element={<QuestionPapersLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/loginnotes" element={<NotesAdmin />} />
        <Route path="/loginqp" element={<QuestionPaperAdmin  />} />
       
        
      </Routes>
      
     
      <Footer />
    </Router>
  );
};

export default App;
