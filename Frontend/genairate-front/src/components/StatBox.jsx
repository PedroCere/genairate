export default function StatBox({ title, value, color = 'primary' }) {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      accent: 'bg-accent/10 text-accent',
      success: 'bg-success/10 text-success',
    };
  
    return (
      <div className={`${colors[color]} p-6 rounded-2xl`}>
        <h3 className="text-sm font-medium mb-2">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    );
  }