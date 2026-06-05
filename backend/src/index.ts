// Initializes and configures the Express server.

import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
import generateRoutes from './routes/generate.js'

// Load environment variables
dotenv.config()

const app: Express = express()
const PORT: number = parseInt(process.env.PORT || '5000', 10)

// Middleware
app.use(helmet())
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/generate', generateRoutes)

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
        status: 'OK',
        message: 'ProposalAI backend is running',
        timestamp: new Date().toISOString()
    })
})

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' })
})

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Server error:', err.stack)
    res.status(500).json({
        error: 'Something went wrong on the server',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
})

// Start server
app.listen(PORT, () => {
    console.log(`🚀 TypeScript server running on http://localhost:${PORT}`)
    console.log(`📝 Health check: http://localhost:${PORT}/api/health`)
})