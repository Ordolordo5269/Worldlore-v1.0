// Middleware para caché en memoria
const cache = new Map();

// Middleware de caché con tiempo de expiración en segundos
function cacheMiddleware(duration) {
    return (req, res, next) => {
        // Crear una clave única para esta solicitud
        const key = req.originalUrl || req.url;
        
        // Verificar si tenemos una respuesta en caché
        const cachedResponse = cache.get(key);
        
        if (cachedResponse && cachedResponse.expiry > Date.now()) {
            // Devolver la respuesta en caché
            return res.json(cachedResponse.data);
        }
        
        // Capturar el método original res.json
        const originalJson = res.json;
        
        // Reemplazar res.json con nuestra versión que guarda en caché
        res.json = function(data) {
            // Guardar en caché antes de enviar
            cache.set(key, {
                data,
                expiry: Date.now() + (duration * 1000)
            });
            
            // Restaurar el comportamiento original
            return originalJson.call(this, data);
        };
        
        next();
    };
}

module.exports = cacheMiddleware; 