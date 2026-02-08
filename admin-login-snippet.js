// Add this to the beginning of the AdminPanel function in admin.html

function App() {
    const [user, setUser] = React.useState(null);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [showLogin, setShowLogin] = React.useState(false);

    React.useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            // Check if user is logged in
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                setLoading(false);
                setShowLogin(true);
                return;
            }

            // Check if user is admin
            const { data: profile } = await supabase
                .from('users')
                .select('is_admin')
                .eq('id', user.id)
                .single();

            if (!profile || !profile.is_admin) {
                // Not an admin - redirect to home
                alert('Access Denied: Admin privileges required');
                window.location.href = 'index.html';
                return;
            }

            // User is authenticated and is admin
            setUser(user);
            setIsAdmin(true);
            setLoading(false);
        } catch (error) {
            console.error('Auth error:', error);
            setLoading(false);
            setShowLogin(true);
        }
    }

    async function handleLogin(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            // Check admin status
            const { data: profile } = await supabase
                .from('users')
                .select('is_admin')
                .eq('id', data.user.id)
                .single();

            if (!profile.is_admin) {
                await supabase.auth.signOut();
                alert('Access Denied: Admin privileges required');
                return;
            }

            // Success
            checkAuth();
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        window.location.href = 'index.html';
    }

    if (loading) {
        return <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh'
        }}>
            <h2>Loading...</h2>
        </div>;
    }

    if (showLogin) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    if (!isAdmin) {
        return <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            flexDirection: 'column'
        }}>
            <h2>Access Denied</h2>
            <p>You need admin privileges to access this page</p>
            <button onClick={() => window.location.href = 'index.html'} 
                    style={{marginTop: '1rem', padding: '0.8rem 2rem'}}>
                Go to Home
            </button>
        </div>;
    }

    // Render admin panel
    return <AdminPanel user={user} onLogout={handleLogout} />;
}

function LoginScreen({ onLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email, password);
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <div style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                maxWidth: '400px',
                width: '100%'
            }}>
                <h1 style={{ 
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Admin Login
                </h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                    Enter your credentials to access the admin panel
                </p>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                border: '2px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                border: '2px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Login to Admin Panel
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                    <a href="index.html" style={{ color: '#667eea', textDecoration: 'none' }}>
                        ← Back to Home
                    </a>
                </p>
            </div>
        </div>
    );
}
