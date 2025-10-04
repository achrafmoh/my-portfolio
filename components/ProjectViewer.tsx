import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Project, Transaction, SalesRecord } from '../types.ts';

// --- START INLINED ICONS ---
const iconStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const XIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" style={{...iconStyle, width: '24px', height: '24px'}}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const ExternalLinkIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" style={{...iconStyle, width: '18px', height: '18px'}}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);

const CodeIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" style={{...iconStyle, width: '18px', height: '18px'}}>
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

// --- END INLINED ICONS ---

const colors: { [key: string]: string } = {
  architect: 'var(--architect-color)',
  artist: 'var(--artist-color)',
  analyst: 'var(--analyst-color)',
};

// =================================================================
// Personal Finance Dashboard
// =================================================================
const PersonalFinanceDashboard: React.FC<{ project: Project }> = ({ project }) => {
    const [transactions, setTransactions] = useState<Transaction[]>(project.chartData as Transaction[]);
    const [formState, setFormState] = useState({ description: '', amount: '', type: 'expense', category: 'Groceries' });

    const kpis = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        return { income, expense, net: income - expense };
    }, [transactions]);

    const expenseByCategory = useMemo(() => {
        if (transactions.filter(t => t.type === 'expense').length === 0) return [];
        const categoryMap = new Map<string, number>();
        transactions.filter(t => t.type === 'expense').forEach(t => {
            categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
        });
        return Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
    }, [transactions]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTransaction: Transaction = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            description: formState.description,
            amount: parseFloat(formState.amount),
            type: formState.type as 'income' | 'expense',
            category: formState.category as Transaction['category'],
        };
        setTransactions(prev => [newTransaction, ...prev]);
        setFormState({ description: '', amount: '', type: 'expense', category: 'Groceries' });
    };

    return (
        <div className="analyst-dashboard">
            <div className="dashboard-main">
                 {transactions.length === 0 ? (
                    <div className="empty-state-panel" style={{gridColumn: '1 / -1'}}>
                        <svg viewBox="0 0 24 24" style={{width: '48px', height: '48px', stroke: 'var(--analyst-color)', strokeWidth: 1}}><polyline points="22 12 16 12 14 15 10 9 8 12 2 12"></polyline><path d="M5.45 5.45L2 2m14.05 14.05L22 22.05"></path></svg>
                        <h4>Your Dashboard is Ready</h4>
                        <p>Add your first income or expense transaction using the form below to see your financial analysis come to life.</p>
                    </div>
                ) : (
                    <>
                        <div className="kpi-grid" style={{gridColumn: '1 / -1'}}>
                            <div className="kpi-card"><h4>Total Income</h4><div className="value income">${kpis.income.toFixed(2)}</div></div>
                            <div className="kpi-card"><h4>Total Expenses</h4><div className="value expense">${kpis.expense.toFixed(2)}</div></div>
                            <div className="kpi-card"><h4>Net Savings</h4><div className={`value ${kpis.net >= 0 ? 'income' : 'expense'}`}>${kpis.net.toFixed(2)}</div></div>
                        </div>
                        <div className="chart-container">
                            <h4>Expense Breakdown</h4>
                            <DonutChart data={expenseByCategory} />
                        </div>
                    </>
                )}
                <div className="panel">
                    <h4>Add Transaction</h4>
                    <form className="transaction-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" value={formState.description} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input type="number" name="amount" value={formState.amount} onChange={handleInputChange} required step="0.01" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <select name="type" value={formState.type} onChange={handleInputChange}>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                             <select name="category" value={formState.category} onChange={handleInputChange}>
                                <option>Groceries</option><option>Utilities</option><option>Transport</option><option>Entertainment</option><option>Salary</option><option>Other</option>
                            </select>
                        </div>
                        <button type="submit" className="analyst-button">Add</button>
                    </form>
                </div>
            </div>
             {transactions.length > 0 && (
                <div className="panel" style={{maxHeight: '300px', overflowY: 'auto'}}>
                    <h4>Recent Transactions</h4>
                    <table className="data-table">
                        <thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th></tr></thead>
                        <tbody>
                            {transactions.slice(0, 20).map(t => (
                                <tr key={t.id}>
                                    <td>{t.date}</td><td>{t.description}</td><td>{t.category}</td>
                                    <td style={{color: t.type === 'income' ? '#38a169' : '#e53e3e'}}>{t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};


// =================================================================
// E-commerce Sales Dashboard
// =================================================================
const SalesPerformanceDashboard: React.FC<{ project: Project }> = ({ project }) => {
    const allData = useMemo(() => project.chartData as SalesRecord[], [project.chartData]);
    const [dateRange, setDateRange] = useState(90);
    const [sortConfig, setSortConfig] = useState<{key: keyof SalesRecord, direction: 'asc' | 'desc'} | null>({key: 'date', direction: 'desc'});
    
    const filteredData = useMemo(() => {
        if (!allData || allData.length === 0) return [];
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - dateRange);
        const startStr = startDate.toISOString().split('T')[0];
        
        return allData.filter(d => d.date >= startStr);
    }, [allData, dateRange]);
    
    const sortedData = useMemo(() => {
        let sortableItems = [...filteredData];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [filteredData, sortConfig]);

    const kpis = useMemo(() => {
        if (filteredData.length === 0) return { totalRevenue: 0, totalOrders: 0, avgOrderValue: 0 };
        const totalRevenue = filteredData.reduce((sum, d) => sum + d.amount, 0);
        const totalOrders = filteredData.length;
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        return { totalRevenue, totalOrders, avgOrderValue };
    }, [filteredData]);
    
    const salesOverTime = useMemo(() => {
       const dateMap = new Map<string, number>();
        filteredData.forEach(d => {
            dateMap.set(d.date, (dateMap.get(d.date) || 0) + d.amount);
        });
        return Array.from(dateMap.entries()).map(([date, sales]) => ({ date, sales })).sort((a,b) => a.date.localeCompare(b.date));
    }, [filteredData]);
    
    const topProducts = useMemo(() => {
        if (!filteredData || filteredData.length === 0) return [];
        const productMap = new Map<string, number>();
        filteredData.forEach(d => {
            productMap.set(d.product, (productMap.get(d.product) || 0) + d.amount);
        });
        return Array.from(productMap.entries()).map(([name, revenue]) => ({ name, revenue })).sort((a,b) => b.revenue - a.revenue).slice(0, 5);
    }, [filteredData]);
    
    const salesByCountry = useMemo(() => {
        const countryMap = new Map<string, number>();
        filteredData.forEach(d => {
            countryMap.set(d.country, (countryMap.get(d.country) || 0) + d.amount);
        });
        return Array.from(countryMap.entries()).map(([name, sales]) => ({ name, sales }));
    }, [filteredData]);
    
    const requestSort = (key: keyof SalesRecord) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="analyst-dashboard">
            <div className="dashboard-disclaimer">
                <p style={{margin:0}}>Note: The data presented here is randomly generated for demonstration purposes only.</p>
            </div>
            <div className="dashboard-header">
                <h3>Sales Performance</h3>
                <div className="filter-group">
                    <label htmlFor="dateRange">Show Last:</label>
                    <select id="dateRange" value={dateRange} onChange={e => setDateRange(parseInt(e.target.value))} className="dashboard-select">
                        <option value={30}>30 Days</option>
                        <option value={60}>60 Days</option>
                        <option value={90}>90 Days</option>
                    </select>
                </div>
            </div>
            <div className="kpi-grid">
                <div className="kpi-card"><h4>Total Revenue</h4><div className="value analyst">${(kpis.totalRevenue / 1000).toFixed(1)}k</div></div>
                <div className="kpi-card"><h4>Total Orders</h4><div className="value analyst">{kpis.totalOrders}</div></div>
                <div className="kpi-card"><h4>Avg. Order Value</h4><div className="value analyst">${kpis.avgOrderValue.toFixed(2)}</div></div>
            </div>
            <div className="dashboard-main">
                 <div className="chart-container full-width"><h4>Revenue Over Time</h4><LineChart data={salesOverTime} /></div>
                 <div className="chart-container"><h4>Top Products by Revenue</h4><BarChart data={topProducts} /></div>
                 <div className="chart-container"><h4>Sales by Country</h4><GeoMap data={salesByCountry} /></div>
                 <div className="panel full-width" style={{maxHeight: '350px', overflowY: 'auto'}}>
                    <h4>All Sales Data</h4>
                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead><tr>
                                {['date', 'orderId', 'product', 'country', 'amount'].map((key) => (
                                     <th key={key} onClick={() => requestSort(key as keyof SalesRecord)} className={sortConfig?.key === key ? 'active' : ''}>
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        {sortConfig?.key === key && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                                    </th>
                                ))}
                            </tr></thead>
                            <tbody>
                                {sortedData.map(d => (
                                    <tr key={d.orderId}><td>{d.date}</td><td>{d.orderId}</td><td>{d.product}</td><td>{d.country}</td><td>${d.amount.toFixed(2)}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


// =================================================================
// SVG Chart Components
// =================================================================
const DonutChart: React.FC<{data: {name: string, value: number}[]}> = ({data}) => {
    const colors = ['#00ff41', '#33ff67', '#66ff8d', '#99ffb3', '#ccffda'];
    const total = data.reduce((sum, d) => sum + d.value, 0);
    if (total === 0) return <div style={{textAlign: 'center', opacity: 0.7}}>No expense data to display.</div>;
    let cumulative = 0;
    
    return(
        <div style={{display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap'}}>
            <svg viewBox="0 0 100 100" style={{minWidth: '120px', flex: 1}}>
                {data.map((d, i) => {
                    const percentage = d.value / total;
                    const startAngle = (cumulative / total) * 360;
                    const endAngle = startAngle + percentage * 360;
                    cumulative += d.value;
                    const largeArc = percentage > 0.5 ? 1 : 0;
                    const x1 = 50 + 40 * Math.cos(Math.PI * startAngle / 180);
                    const y1 = 50 + 40 * Math.sin(Math.PI * startAngle / 180);
                    const x2 = 50 + 40 * Math.cos(Math.PI * endAngle / 180);
                    const y2 = 50 + 40 * Math.sin(Math.PI * endAngle / 180);
                    const pathData = `M 50,50 L ${x1},${y1} A 40,40 0 ${largeArc},1 ${x2},${y2} Z`;
                    return <path key={i} d={pathData} fill={colors[i % colors.length]} className="donut-segment-animate" style={{ animationDelay: `${i * 100}ms` }} />;
                })}
                 <circle cx="50" cy="50" r="25" fill="#010409"/>
            </svg>
            <div style={{fontSize: '0.8rem', lineHeight: 1.8, flex: 2}}>
                {data.map((d,i) => (
                    <div key={i} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <div style={{width: '10px', height: '10px', backgroundColor: colors[i % colors.length], borderRadius: '2px'}}/>
                        <div>{d.name}: ${d.value.toFixed(2)} ({(d.value/total * 100).toFixed(1)}%)</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const Tooltip: React.FC<{
  show: boolean;
  x: number;
  y: number;
  content: string;
}> = ({ show, x, y, content }) => (
  <div
    className="chart-tooltip"
    style={{
      display: show ? 'block' : 'none',
      left: x,
      top: y,
      opacity: show ? 1 : 0,
      transform: `translate(-50%, -120%)`,
    }}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const LineChart: React.FC<{data: {date: string, sales: number}[]}> = ({data}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });
    if (data.length === 0) return <div style={{textAlign: 'center', opacity: 0.7}}>Not enough data to display chart.</div>;

    const width = 800, height = 250, margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const maxSales = Math.max(...data.map(d => d.sales)) * 1.1;
    const xScale = (i: number) => margin.left + (i / (data.length - 1)) * (width - margin.left - margin.right);
    const yScale = (v: number) => height - margin.bottom - (v / maxSales) * (height - margin.top - margin.bottom);
    const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.sales)}`).join(' ');

    const handleMouseMove = (e: React.MouseEvent, i: number) => {
        const svgRect = svgRef.current?.getBoundingClientRect();
        if (!svgRect) return;
        const d = data[i];
        setTooltip({
            show: true,
            x: e.clientX - svgRect.left,
            y: e.clientY - svgRect.top,
            content: `<strong>${d.date}</strong><br/>Sales: $${d.sales.toFixed(2)}`
        });
    };

    return (
        <div style={{position: 'relative', width: '100%'}}>
             <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
                {[0, 0.25, 0.5, 0.75, 1].map(tick => (
                    <g key={tick}>
                        <line className="grid-line" x1={margin.left} x2={width - margin.right} y1={yScale(tick * maxSales)} y2={yScale(tick * maxSales)} />
                        <text className="axis-text" x={margin.left - 5} y={yScale(tick * maxSales)} dy="3" textAnchor="end">
                            ${(tick * maxSales / 1000).toFixed(0)}k
                        </text>
                    </g>
                ))}
                <path d={path} fill="none" stroke="var(--analyst-color)" strokeWidth="2" className="line-chart-path" />
                {data.map((d,i) => (
                    <circle key={i} cx={xScale(i)} cy={yScale(d.sales)} r="8" fill="transparent"
                        onMouseMove={(e) => handleMouseMove(e, i)}
                        onMouseLeave={() => setTooltip(t => ({...t, show: false}))}
                    />
                ))}
            </svg>
            <Tooltip {...tooltip} />
        </div>
    );
};

const BarChart: React.FC<{data: {name: string, revenue: number}[]}> = ({data}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });
    if (data.length === 0) return <div style={{textAlign: 'center', opacity: 0.7}}>No data to display.</div>;

    const width = 400, height = 250, margin = { top: 10, right: 10, bottom: 20, left: 100 };
    const maxRevenue = Math.max(...data.map(d => d.revenue));
    const barHeight = (height - margin.top - margin.bottom) / data.length;
    const xScale = (v: number) => margin.left + (v / maxRevenue) * (width - margin.left - margin.right);
    
    const handleMouseMove = (e: React.MouseEvent, i: number) => {
        const svgRect = svgRef.current?.getBoundingClientRect();
        if (!svgRect) return;
        const d = data[i];
        setTooltip({
            show: true,
            x: e.clientX - svgRect.left,
            y: e.clientY - svgRect.top,
            content: `<strong>${d.name}</strong><br/>Revenue: $${d.revenue.toFixed(2)}`
        });
    };
    
    return (
        <div style={{position: 'relative', width: '100%'}}>
            <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
                {data.map((d,i) => (
                    <g key={d.name}>
                        <text className="axis-text" x={margin.left - 5} y={margin.top + i * barHeight + barHeight / 2} dy="3" textAnchor="end">{d.name}</text>
                        <rect className="bar-chart-rect" x={margin.left} y={margin.top + i * barHeight + barHeight * 0.1} 
                              width={xScale(d.revenue) - margin.left} height={barHeight * 0.8} fill="var(--analyst-color)" 
                              onMouseMove={(e) => handleMouseMove(e,i)}
                              onMouseLeave={() => setTooltip(t => ({...t, show: false}))}
                              style={{ animationDelay: `${i * 100}ms` }}
                        />
                    </g>
                ))}
            </svg>
             <Tooltip {...tooltip} />
        </div>
    )
};

const GeoMap: React.FC<{data: {name: string, sales: number}[]}> = ({data}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });
    const maxSales = Math.max(...data.map(d => d.sales));
    // Simple path data for world map - not accurate, just for visualization
    const paths: {[key: string]: string} = {
        USA: "M10 80 L80 50 L120 120 L10 120 Z",
        Canada: "M10 50 L80 20 L120 50 L10 80 Z",
        UK: "M150 50 L160 40 L170 55 L155 60 Z",
        Germany: "M180 60 L200 55 L205 70 L185 75 Z",
        France: "M175 80 L195 75 L200 90 L180 95 Z",
        Japan: "M250 80 L270 70 L280 100 L260 110 Z",
    };
    
    const getColor = (sales: number) => {
        const intensity = sales / maxSales;
        return `rgba(0, 255, 65, ${0.2 + intensity * 0.8})`;
    };
    
    const handleMouseMove = (e: React.MouseEvent, country: string) => {
        const svgRect = svgRef.current?.getBoundingClientRect();
        if (!svgRect) return;
        const countryData = data.find(d => d.name === country);
        setTooltip({
            show: true,
            x: e.clientX - svgRect.left,
            y: e.clientY - svgRect.top,
            content: `<strong>${country}</strong><br/>Sales: $${countryData?.sales.toFixed(2) || '0.00'}`
        });
    };
    
    return (
         <div style={{position: 'relative', width: '100%'}}>
            <svg ref={svgRef} viewBox="0 0 300 150">
                {Object.keys(paths).map(country => {
                    const countryData = data.find(d => d.name === country);
                    return <path key={country} d={paths[country]} fill={countryData ? getColor(countryData.sales) : "#333"} stroke="#666" strokeWidth="0.5" 
                                 className="country-path"
                                 onMouseMove={(e) => handleMouseMove(e, country)}
                                 onMouseLeave={() => setTooltip(t => ({...t, show: false}))}
                           />
                })}
            </svg>
            <Tooltip {...tooltip} />
        </div>
    );
};

// =================================================================
// Main Project Viewer Component
// =================================================================
export const ProjectViewer: React.FC<{ project: Project | null; onClose: () => void; }> = ({ project, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    
    useEffect(() => {
        // Reset state when project changes
        if (project) {
            setIsClosing(false);
        }
    }, [project]);


    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 500); // Match animation duration
    };

    if (!project) return null;

    const primaryTag = project.tags[0];
    const accentColor = colors[primaryTag] || 'var(--primary-accent)';
    
    const isAnalystProject = project.tags.includes('analyst') && project.projectType;

    const renderContent = () => {
        if (project.projectType === 'personal-finance-dashboard') {
            return <PersonalFinanceDashboard project={project} />;
        }
        if (project.projectType === 'sales-performance-dashboard') {
            return <SalesPerformanceDashboard project={project} />;
        }

        // Fallback for Architect/Artist projects
        const mediaUrl = project.simulationGif || project.image;
        const isVideo = mediaUrl.toLowerCase().endsWith('.mp4') || mediaUrl.toLowerCase().endsWith('.webm');

        return (
            <>
                <div style={{ width: '100%', aspectRatio: '16 / 9', background: '#000', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isVideo ? (
                        <video
                            src={mediaUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            aria-label={`${project.title} video`}
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img 
                            src={mediaUrl} 
                            alt={`${project.title} simulation`} 
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                    )}
                </div>
                <p style={{ lineHeight: 1.8, fontSize: '0.9rem', color: 'var(--text-color)', opacity: 0.9, whiteSpace: 'pre-wrap' }}>{project.longDescription}</p>
            </>
        );
    };

    const panelWidth = isAnalystProject ? 'clamp(320px, 90vw, 1200px)' : 'clamp(320px, 90vw, 800px)';

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            backgroundColor: 'rgba(1, 4, 9, 0.5)',
            backdropFilter: 'blur(10px)',
            animation: isClosing ? 'fadeOut 0.3s forwards' : 'fadeIn 0.3s forwards',
        }}>
            <div 
                className="project-viewer-panel"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: panelWidth,
                    backgroundColor: '#010409f2',
                    borderLeft: `1px solid ${accentColor}`,
                    boxShadow: `0 0 30px ${accentColor}33`,
                    animation: isClosing ? 'slideOutToRight 0.5s ease-in forwards' : 'slideInFromRight 0.5s ease-out forwards',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage: 'linear-gradient(rgba(139, 148, 158, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 148, 158, 0.05) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            >
                <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', flexShrink: 0, background: '#010409' }}>
                    <h2 style={{ fontFamily: 'var(--font-family)', fontSize: '1.5rem', margin: '0', color: accentColor, fontWeight: 600 }}>{project.title}</h2>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                        {project.tags.map(tag => (
                            <span key={tag} style={{ fontSize: '0.75rem', background: 'var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{tag}</span>
                        ))}
                    </div>
                </header>

                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    {renderContent()}
                </div>

                <footer style={{ 
                    padding: '1rem 2rem', 
                    borderTop: '1px solid var(--border-color)', 
                    flexShrink: 0, 
                    background: '#010409', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                }}>
                    <p style={{margin: 0, fontSize: '0.8rem', opacity: 0.8, flex: '1 1 300px', minWidth: '0'}}>{project.description}</p>
                    <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
                        {project.liveUrl && (
                            <a 
                              href={project.liveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="analyst-button" 
                              style={{
                                ...({ '--analyst-color': accentColor } as React.CSSProperties),
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem'
                              }}
                            >
                                <ExternalLinkIcon />
                                Live Demo
                            </a>
                        )}
                        {project.codeUrl && (
                            <a 
                              href={project.codeUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="analyst-button" 
                              style={{
                                ...({ '--analyst-color': accentColor } as React.CSSProperties),
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem'
                              }}
                            >
                                <CodeIcon />
                                View Code
                            </a>
                        )}
                    </div>
                </footer>
                
                <button onClick={handleClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem' }}><XIcon /></button>
            </div>
        </div>
    );
};