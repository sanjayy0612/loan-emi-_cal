import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  // State for inputs
  const [principal, setPrincipal] = useState<number | string>("");
  const [rate, setRate] = useState<number | string>("");
  const [tenure, setTenure] = useState<number | string>("");

  // State for results
  const [emi, setEmi] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Calculate EMI whenever inputs change
  useEffect(() => {
    const p = Number(principal);
    const r = Number(rate);
    const n = Number(tenure);

    if (p > 0 && n > 0) {
      let calculatedEmi = 0;

      if (r > 0) {
        const monthlyRate = r / (12 * 100);
        const pow = Math.pow(1 + monthlyRate, n);
        calculatedEmi = (p * monthlyRate * pow) / (pow - 1);
      } else {
        // If interest rate is 0, just divide principal by tenure
        calculatedEmi = p / n;
      }

      const totalPayable = calculatedEmi * n;
      const interestPayable = totalPayable - p;

      setEmi(calculatedEmi);
      setTotalAmount(totalPayable);
      setTotalInterest(interestPayable);
    } else {
      setEmi(0);
      setTotalAmount(0);
      setTotalInterest(0);
    }
  }, [principal, rate, tenure]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="bg-primary text-white p-2 rounded-lg">
            <Calculator className="w-6 h-6" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900">
            Loan EMI Calculator
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Section */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-none shadow-lg bg-white overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <CardTitle className="text-lg font-medium text-slate-700">
                  Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                {/* Principal Input */}
                <div className="space-y-3">
                  <Label htmlFor="principal" className="text-slate-600 font-medium">
                    Principal Amount (₹)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="principal"
                      type="number"
                      placeholder="e.g. 500000"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      className="pl-10 h-12 text-lg font-medium border-slate-200 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all"
                      data-testid="input-principal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Interest Rate Input */}
                  <div className="space-y-3">
                    <Label htmlFor="rate" className="text-slate-600 font-medium">
                      Interest Rate (% p.a)
                    </Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="rate"
                        type="number"
                        placeholder="e.g. 8.5"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="pl-10 h-12 text-lg font-medium border-slate-200 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all"
                        data-testid="input-rate"
                      />
                    </div>
                  </div>

                  {/* Tenure Input */}
                  <div className="space-y-3">
                    <Label htmlFor="tenure" className="text-slate-600 font-medium">
                      Loan Tenure (Months)
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="tenure"
                        type="number"
                        placeholder="e.g. 24"
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        className="pl-10 h-12 text-lg font-medium border-slate-200 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all"
                        data-testid="input-tenure"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
              <CardContent className="p-4 flex gap-4 items-start">
                <div className="bg-blue-100 p-2 rounded-full shrink-0">
                  <Calculator className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-sm text-slate-600 leading-relaxed">
                  Enter your loan details above to calculate your monthly payments. 
                  The interest rate should be the annual percentage rate (APR).
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-5">
            <Card className="bg-primary text-white border-none shadow-xl h-full flex flex-col relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none"></div>

              <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-white/80 text-sm uppercase tracking-wider font-medium">
                  Your Monthly Payment
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col relative z-10 pt-2">
                <motion.div 
                  key={emi}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="text-5xl md:text-6xl font-bold font-display tracking-tight text-white" data-testid="text-emi">
                    {formatCurrency(emi)}
                  </div>
                  <div className="text-white/60 mt-2 text-sm font-medium">
                    Standard Monthly EMI
                  </div>
                </motion.div>

                <Separator className="bg-white/10 mb-8" />

                <div className="space-y-6 mt-auto">
                  <div className="flex justify-between items-end">
                    <div className="text-white/70 text-sm">Total Amount Payable</div>
                    <div className="text-xl font-semibold font-display" data-testid="text-total-amount">
                      {formatCurrency(totalAmount)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="text-accent text-sm font-medium">Total Interest</div>
                    <div className="text-xl font-semibold font-display text-accent" data-testid="text-total-interest">
                      {formatCurrency(totalInterest)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
