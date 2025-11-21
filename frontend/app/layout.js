import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Next + Express Assignment',
  description: 'Frontend for assignment'
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <main className="site-container">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
