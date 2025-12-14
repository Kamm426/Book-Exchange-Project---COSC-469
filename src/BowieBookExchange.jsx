import React, { useState, useEffect } from 'react';
import { Search, BookOpen, MessageCircle, User, Plus, Filter, X, Send } from 'lucide-react';

const BowieBookExchange = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login');
  const [books, setBooks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('all');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');

  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', major: '' });
  const [bookForm, setBookForm] = useState({ title: '', author: '', price: '', condition: 'good', description: '' });

  useEffect(() => {
    const savedBooks = [
      {
        id: '1',
        title: 'Introduction to Psychology',
        author: 'James W. Kalat',
        price: '45.00',
        condition: 'good',
        description: 'Great condition, minor highlighting',
        sellerId: 'demo',
        sellerName: 'Demo User',
        datePosted: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Calculus: Early Transcendentals',
        author: 'James Stewart',
        price: '85.00',
        condition: 'like-new',
        description: 'Barely used, all pages intact',
        sellerId: 'demo',
        sellerName: 'Demo User',
        datePosted: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Biology: Concepts and Connections',
        author: 'Campbell & Reece',
        price: '60.00',
        condition: 'good',
        description: 'Some wear on cover, pages clean',
        sellerId: 'other1',
        sellerName: 'Sarah Johnson',
        datePosted: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Principles of Economics',
        author: 'N. Gregory Mankiw',
        price: '75.00',
        condition: 'like-new',
        description: 'Only used one semester, perfect condition',
        sellerId: 'other2',
        sellerName: 'Marcus Williams',
        datePosted: new Date().toISOString()
      },
      {
        id: '5',
        title: 'Chemistry: The Central Science',
        author: 'Brown, LeMay, Bursten',
        price: '95.00',
        condition: 'acceptable',
        description: 'Heavy use but all content readable',
        sellerId: 'other3',
        sellerName: 'Emily Chen',
        datePosted: new Date().toISOString()
      },
      {
        id: '6',
        title: 'American Government and Politics',
        author: 'Wilson & DiIulio',
        price: '40.00',
        condition: 'good',
        description: 'Good study notes included!',
        sellerId: 'other4',
        sellerName: 'James Davis',
        datePosted: new Date().toISOString()
      }
    ];
    setBooks(savedBooks);
  }, []);

  const handleSignup = () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.major) {
      alert('Please fill in all fields');
      return;
    }
    const newUser = { ...signupForm, id: Date.now().toString() };
    setCurrentUser(newUser);
    setView('marketplace');
    setSignupForm({ name: '', email: '', password: '', major: '' });
  };

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      alert('Please fill in all fields');
      return;
    }
    // Demo login - accept any credentials
    const user = { id: 'demo', name: 'Demo User', email: loginForm.email, major: 'Computer Science' };
    setCurrentUser(user);
    setView('marketplace');
    setLoginForm({ email: '', password: '' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
  };

  const handlePostBook = () => {
    if (!bookForm.title || !bookForm.author || !bookForm.price) {
      alert('Please fill in all required fields');
      return;
    }
    const newBook = {
      ...bookForm,
      id: Date.now().toString(),
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      datePosted: new Date().toISOString()
    };
    setBooks([...books, newBook]);
    setBookForm({ title: '', author: '', price: '', condition: 'good', description: '' });
    setView('marketplace');
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      alert('Please enter a message');
      return;
    }
    const newMessage = {
      id: Date.now().toString(),
      bookId: selectedBook.id,
      bookTitle: selectedBook.title,
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId: selectedBook.sellerId,
      receiverName: selectedBook.sellerName,
      text: messageText,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMessage]);
    setMessageText('');
    setShowMessageModal(false);
    alert('Message sent successfully!');
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = filterCondition === 'all' || book.condition === filterCondition;
    return matchesSearch && matchesCondition;
  });

  const myMessages = messages.filter(m => m.receiverId === currentUser?.id || m.senderId === currentUser?.id);

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-yellow-500 to-black flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <BookOpen className="w-16 h-16 text-black mx-auto mb-2" />
            <h1 className="text-3xl font-bold text-black">Bowie State</h1>
            <h2 className="text-xl text-yellow-600">Book Exchange</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              />
            </div>
            <button onClick={handleLogin} className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
              Login
            </button>
            <button onClick={() => setView('signup')} className="w-full bg-yellow-500 text-black py-2 rounded-md hover:bg-yellow-600 transition font-semibold">
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-yellow-500 to-black flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">Create Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={signupForm.name}
                onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={signupForm.email}
                onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={signupForm.password}
                onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                value={signupForm.major}
                onChange={(e) => setSignupForm({...signupForm, major: e.target.value})}
              />
            </div>
            <button onClick={handleSignup} className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
              Sign Up
            </button>
            <button onClick={() => setView('login')} className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition">
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-black to-yellow-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Bowie State Book Exchange</h1>
                <p className="text-sm opacity-90">Buy, Sell, Trade Textbooks</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setView('marketplace')} className="hover:bg-white/20 px-3 py-2 rounded transition">
                Marketplace
              </button>
              <button onClick={() => setView('messages')} className="hover:bg-white/20 px-3 py-2 rounded transition flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>Messages {myMessages.length > 0 && `(${myMessages.length})`}</span>
              </button>
              <button onClick={() => setView('post')} className="bg-yellow-500 text-black px-4 py-2 rounded font-bold hover:bg-yellow-400 transition flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>Post Book</span>
              </button>
              <button onClick={() => setView('profile')} className="hover:bg-white/20 p-2 rounded transition">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {view === 'marketplace' && (
          <div>
            <div className="mb-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search books by title or author..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  value={filterCondition}
                  onChange={(e) => setFilterCondition(e.target.value)}
                >
                  <option value="all">All Conditions</option>
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="acceptable">Acceptable</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map(book => (
                <div key={book.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{book.title}</h3>
                    <p className="text-gray-600">by {book.author}</p>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-black">${book.price}</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        {book.condition}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{book.description}</p>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <p className="text-sm text-gray-600">Seller: {book.sellerName}</p>
                    {book.sellerId !== currentUser?.id && (
                      <button
                        onClick={() => {
                          setSelectedBook(book);
                          setShowMessageModal(true);
                        }}
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Contact Seller</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No books found. Be the first to post!</p>
              </div>
            )}
          </div>
        )}

        {view === 'post' && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-black mb-6">Post a Book</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book Title *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={bookForm.title}
                  onChange={(e) => setBookForm({...bookForm, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={bookForm.author}
                  onChange={(e) => setBookForm({...bookForm, author: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={bookForm.price}
                  onChange={(e) => setBookForm({...bookForm, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={bookForm.condition}
                  onChange={(e) => setBookForm({...bookForm, condition: e.target.value})}
                >
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="acceptable">Acceptable</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={bookForm.description}
                  onChange={(e) => setBookForm({...bookForm, description: e.target.value})}
                  placeholder="Any additional details about the book..."
                />
              </div>
              <div className="flex space-x-4">
                <button onClick={handlePostBook} className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition font-medium">
                  Post Book
                </button>
                <button onClick={() => setView('marketplace')} className="flex-1 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'messages' && (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-black mb-6">Messages</h2>
            {myMessages.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myMessages.map(msg => (
                  <div key={msg.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{msg.senderId === currentUser.id ? `To: ${msg.receiverName}` : `From: ${msg.senderName}`}</p>
                        <p className="text-sm text-gray-600">Re: {msg.bookTitle}</p>
                      </div>
                      <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700">{msg.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'profile' && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{currentUser?.name}</h2>
                <p className="text-gray-600">{currentUser?.major}</p>
                <p className="text-gray-500 text-sm">{currentUser?.email}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">My Listings</h3>
              <div className="space-y-3">
                {books.filter(b => b.sellerId === currentUser?.id).map(book => (
                  <div key={book.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{book.title}</p>
                      <p className="text-sm text-gray-600">${book.price} - {book.condition}</p>
                    </div>
                  </div>
                ))}
                {books.filter(b => b.sellerId === currentUser?.id).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No listings yet</p>
                )}
              </div>
            </div>

            <button onClick={handleLogout} className="w-full mt-6 bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition">
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Contact Seller</h3>
              <button onClick={() => setShowMessageModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">Book: {selectedBook?.title}</p>
            <div>
              <textarea
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
                placeholder="Hi, I'm interested in your book..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button onClick={handleSendMessage} className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition flex items-center justify-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BowieBookExchange;
