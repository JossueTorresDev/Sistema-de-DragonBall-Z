-- Agregar columna eliminado a la tabla personajes si no existe
-- (Esta migración es opcional ya que agregamos el campo en la entidad)

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'personajes' AND column_name = 'eliminado'
    ) THEN
        ALTER TABLE personajes ADD COLUMN eliminado BOOLEAN DEFAULT FALSE NOT NULL;
        
        -- Actualizar todos los registros existentes como no eliminados
        UPDATE personajes SET eliminado = FALSE WHERE eliminado IS NULL;
    END IF;
END $$;