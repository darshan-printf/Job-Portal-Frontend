import WebHeader from './WebHeader';
import WebFooter from './WebFooter';
export default function Layout({ children }) {
    return (
        <div>
            <WebHeader />
            <div className="main" >
                {children}
            </div>
            <WebFooter />
        </div>
    );
};