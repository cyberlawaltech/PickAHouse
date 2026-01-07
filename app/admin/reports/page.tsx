"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Download, FileText } from "lucide-react"

export default function AdminReportsPage() {
  const reports = [
    { title: "Monthly Listings Report", date: "Generated Jan 15, 2024", rows: "487 listings" },
    { title: "User Activity Report", date: "Generated Jan 14, 2024", rows: "2,847 users" },
    { title: "Revenue Report", date: "Generated Jan 13, 2024", rows: "₦24.8M revenue" },
    { title: "Property Analytics", date: "Generated Jan 12, 2024", rows: "156.4K views" },
  ]

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Reports</h1>
          <p className="text-muted-foreground">View and download platform reports</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="grid md:grid-cols-2 gap-6">
          {reports.map((report, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5" />
                  {report.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{report.date}</p>
                    <p className="text-sm font-medium">{report.rows}</p>
                  </div>
                  <Button className="w-full gap-2 bg-transparent" variant="outline">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
