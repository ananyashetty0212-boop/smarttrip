import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { 
  PieChart, 
  DollarSign, 
  PlusCircle, 
  Hotel, 
  Car, 
  Utensils, 
  Compass, 
  ShoppingBag, 
  ShieldAlert,
  Sparkles,
  TrendingDown,
  CheckCircle
} from 'lucide-react';

export const BudgetPage = () => {
  const { activeTrip, addExpense } = useTrip();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    description: '',
    amount: '',
    category: 'Food & Dining'
  });

  const totalAllocated = activeTrip.totalAllocatedBudget || 800;
  const breakdown = activeTrip.budgetBreakdown || [
    { category: 'Accommodation', estimated: 320, spent: 300, icon: 'Hotel' },
    { category: 'Transport', estimated: 120, spent: 110, icon: 'Car' },
    { category: 'Food & Dining', estimated: 200, spent: 165, icon: 'Utensils' },
    { category: 'Activities & Sightseeing', estimated: 100, spent: 85, icon: 'Compass' },
    { category: 'Shopping & Souvenirs', estimated: 40, spent: 45, icon: 'ShoppingBag' },
    { category: 'Emergency & Misc', estimated: 20, spent: 10, icon: 'ShieldAlert' }
  ];

  const totalSpent = breakdown.reduce((sum, item) => sum + item.spent, 0);
  const totalEstimated = breakdown.reduce((sum, item) => sum + item.estimated, 0);
  const remainingBalance = totalAllocated - totalSpent;
  const spentPercentage = Math.min(Math.round((totalSpent / totalAllocated) * 100), 100);

  const getCategoryIcon = (category) => {
    if (category.includes('Accommodation')) return <Hotel style={{ width: '20px', height: '20px', color: '#6366f1' }} />;
    if (category.includes('Transport')) return <Car style={{ width: '20px', height: '20px', color: '#06b6d4' }} />;
    if (category.includes('Food')) return <Utensils style={{ width: '20px', height: '20px', color: '#f59e0b' }} />;
    if (category.includes('Activities')) return <Compass style={{ width: '20px', height: '20px', color: '#10b981' }} />;
    if (category.includes('Shopping')) return <ShoppingBag style={{ width: '20px', height: '20px', color: '#f43f5e' }} />;
    return <ShieldAlert style={{ width: '20px', height: '20px', color: '#8b5cf6' }} />;
  };

  const handleAddExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseForm.amount || !expenseForm.description) return;
    addExpense(expenseForm);
    setExpenseForm({ description: '', amount: '', category: 'Food & Dining' });
    setIsModalOpen(false);
  };

  return (
    <div className="page-wrapper animate-fade-in">
      
      {/* Page Title & Add Expense CTA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Badge variant="emerald" style={{ marginBottom: '0.4rem' }}>Financial Analytics</Badge>
          <h1 style={{ fontSize: '2.2rem' }}>Trip Budget & Expense Tracker</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Allocated budget for {activeTrip.destination} ({activeTrip.durationDays} Days)
          </p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle style={{ width: '18px', height: '18px' }} />
          <span>Add Custom Expense</span>
        </button>
      </div>

      {/* Summary Metrics Bar */}
      <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
        <GlassCard>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Total Allocated Budget</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f8fafc' }}>${totalAllocated}</div>
          <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginTop: '0.2rem' }}>
            Target Max Spend limit
          </div>
        </GlassCard>

        <GlassCard style={{ borderColor: 'rgba(16, 185, 129, 0.4)' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Total Spent to Date</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#10b981' }}>${totalSpent}</div>
          <div style={{ fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.2rem' }}>
            <TrendingDown style={{ width: '14px', height: '14px' }} /> ${totalAllocated - totalSpent} Under Budget
          </div>
        </GlassCard>

        <GlassCard>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Remaining Balance</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: remainingBalance >= 0 ? '#06b6d4' : '#f43f5e' }}>
            ${remainingBalance}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Available for remaining activities
          </div>
        </GlassCard>
      </div>

      {/* Budget Progress Bar Indicator */}
      <GlassCard style={{ marginBottom: '2.5rem', padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc' }}>Budget Consumption Progress</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#06b6d4' }}>{spentPercentage}% Spent</span>
        </div>

        <div style={{
          height: '14px',
          borderRadius: '7px',
          background: 'rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: `${spentPercentage}%`,
            height: '100%',
            background: 'var(--gradient-primary)',
            borderRadius: '7px',
            transition: 'width 0.5s ease'
          }} />
        </div>
      </GlassCard>

      {/* Category Breakdown Cards Grid */}
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Expense Categories Breakdown</h2>
      
      <div className="grid-3" style={{ marginBottom: '3rem' }}>
        {breakdown.map((item, idx) => {
          const itemPercent = Math.round((item.spent / (item.estimated || 1)) * 100);
          return (
            <GlassCard key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{
                    padding: '0.65rem',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}>
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', color: '#f8fafc' }}>{item.category}</h3>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Est: ${item.estimated}</span>
                  </div>
                </div>
                <Badge variant={item.spent > item.estimated ? 'rose' : 'emerald'}>
                  {item.spent > item.estimated ? 'Over' : 'On Track'}
                </Badge>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Actual Spent</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>${item.spent}</div>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{itemPercent}% allocated</span>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Modal for Adding Custom Expense */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Custom Expense">
        <form onSubmit={handleAddExpenseSubmit}>
          <div className="form-group">
            <label className="form-label">Expense Description</label>
            <input 
              type="text"
              className="form-control"
              placeholder="e.g. Seafood Dinner at Shack"
              value={expenseForm.description}
              onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Amount ($ USD)</label>
            <input 
              type="number"
              className="form-control"
              placeholder="e.g. 35"
              value={expenseForm.amount}
              onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Category</label>
            <select
              className="form-control form-select"
              value={expenseForm.category}
              onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
            >
              <option value="Food & Dining">Food & Dining</option>
              <option value="Transport">Transport</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Activities & Sightseeing">Activities & Sightseeing</option>
              <option value="Shopping & Souvenirs">Shopping & Souvenirs</option>
              <option value="Emergency & Misc">Emergency & Misc</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Save Expense
          </button>
        </form>
      </Modal>

    </div>
  );
};
