import os
import json
import shutil

# 📌 Rutas de carpetas
input_dir = r"E:\Nepy\Pictures\arnimex\Sitio Web\ArnimexTools\labelGenerator\resources\barcodes-v2"
output_dir = r"E:\Nepy\Pictures\arnimex\Sitio Web\ArnimexTools\labelGenerator\resources\barcodes-v2-renombrados"

# 📌 Asegúrate de pegar aquí el JSON limpio (data → name)
mapping = [
  { "data": "am001", "name": "Acondicionador_Solido.png" },
  { "data": "am002", "name": "Bolsa_De_Arnica_Seca.png" },
  { "data": "am003", "name": "Bolsa_De_Espinosilla_Seca.png" },
  { "data": "am004", "name": "Bolsa_De_Marrubio_Seca.png" },
  { "data": "am005", "name": "Cepillo_De_Bambu.png" },
  { "data": "am006", "name": "Crema_Arnica_Calendula.png" },
  { "data": "am007", "name": "Crema_Chica_8_Manzanilla_Miel.png" },
  { "data": "am008", "name": "Crema_Grande_10_Manzanilla_Miel.png" },
  { "data": "am009", "name": "Crema_Tepezcohuite_Cuachalalte.png" },
  { "data": "am010", "name": "Desodorante_Alumbre.png" },
  { "data": "am011", "name": "Desodorante_Leche_Magnesia.png" },
  { "data": "am012", "name": "Desodorante_Solido_Coco_Karite_Bicarbonato.png" },
  { "data": "am013", "name": "Gel_Antibacterial_Manos_Arnica_Sin_Dispensador_250ml.png" },
  { "data": "am014", "name": "Gel_Antibacterial_Manos_Arnica_Sin_Dispensador_500ml.png" },
  { "data": "am015", "name": "Gel_Antibacterial_Manos_Arnica_Con_Dispensador_1L.png" },
  { "data": "am016", "name": "Gel_Antibacterial_Manos_Arnica_Con_Dispensador_300ml.png" },
  { "data": "am017", "name": "Gel_Antibacterial_Manos_Arnica_250ml_Con_Dispensador.png" },
  { "data": "am018", "name": "Gel_Arnica.png" },
  { "data": "am019", "name": "Jabon_Solido_De_Marrubio_Azomiate.png" },
  { "data": "am020", "name": "Jabon_Solido_Arroz_Miel.png" },
  { "data": "am021", "name": "Jabon_Solido_Arnica_Miel.png" },
  { "data": "am022", "name": "Jabon_Solido_Avena_Miel.png" },
  { "data": "am023", "name": "Jabon_Solido_Cafe_Miel.png" },
  { "data": "am024", "name": "Jabon_Liquido_Antibacterial_250ml_Con_Arnica.png" },
  { "data": "am025", "name": "Jabon_Liquido_Antibacterial_Con_Dispensador_500ml.png" },
  { "data": "am026", "name": "Jabon_Solido_Manzanilla_Miel.png" },
  { "data": "am027", "name": "Jabon_Solido_De_Romero_Miel.png" },
  { "data": "am028", "name": "Jabon_Solido_De_Rosa_De_Castilla.png" },
  { "data": "am029", "name": "Jabon_Solido_Espinosilla_Arnica_Higiene_Intima.png" },
  { "data": "am030", "name": "Jabon_Solido_De_Tepezcohuite_Cuacahalalate.png" },
  { "data": "am031", "name": "Jabon_De_Tepezcohuite_Miel.png" },
  { "data": "am032", "name": "Jabon_Liquido_Antibacterial_Con_Arnica_500ml_Sin_Dispensador.png" },
  { "data": "am033", "name": "Pomada_Arnica.png" },
  { "data": "am034", "name": "Shampoo_Liquido_Romero_Cola_De_Caballo_500ml.png" },
  { "data": "am035", "name": "Shampoo_Liquido_Cascara_De_Nuez_250ml.png" },
  { "data": "am036", "name": "Shampoo_Liquido_Cascara_De_Nuez_500ml.png" },
  { "data": "am037", "name": "Shampoo_Liquido_Manzanilla_Miel_250ml.png" },
  { "data": "am038", "name": "Shampoo_Liquido_Manzanilla_Miel_500ml.png" },
  { "data": "am039", "name": "Shampoo_Liquido_Antipiojos_Ruda_250ml.png" },
  { "data": "am040", "name": "Shampoo_Liquido_Romero_Cola_De_Caballo_250ml.png" },
  { "data": "am041", "name": "Shampoo_Liquido_Anticaida_Romero_Espinosilla_250ml.png" },
  { "data": "am042", "name": "Shampoo_Liquido_Anticaida_Romero_Espinosilla_500ml.png" },
  { "data": "am043", "name": "Shampoo_Solido_Carbon_Activado_Citricos.png" },
  { "data": "am044", "name": "Shampoo_Solido_Flor_De_Hibisco_Citricos.png" },
  { "data": "am045", "name": "Shampoo_Solido_Romero.png" },
  { "data": "am046", "name": "Exfoliante_Bicarbonato_Coco.png" },
  { "data": "am047", "name": "Balsamo_Labial.png" }
]

# 📌 Crear carpeta destino si no existe
os.makedirs(output_dir, exist_ok=True)

# 📌 Recorrer el mapping
for item in mapping:
    old_name = item["data"] + ".png"   # nombre original (ejemplo: am001.png)
    new_name = item["name"]            # nuevo nombre
    old_path = os.path.join(input_dir, old_name)
    new_path = os.path.join(output_dir, new_name)

    if os.path.exists(old_path):
        shutil.copy2(old_path, new_path)
        print(f"✅ Copiado: {old_name} → {new_name}")
    else:
        print(f"⚠️ No encontrado: {old_name}")
