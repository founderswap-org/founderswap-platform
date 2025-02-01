INSERT INTO public.languages (code, name)
VALUES 
    ('en', 'English'),
    ('it', 'Italiano'),
    ('es', 'Español'),
    ('fr', 'Français'),
    ('de', 'Deutsch');

INSERT INTO public.interest_types (id) VALUES 
    (1), (2), (3), (4), (5), (6), (7), (8), (9), (10),
    (11), (12), (13), (14), (15), (16), (17), (18), (19), (20);

INSERT INTO public.interest_translations (interest_id, language_code, name)
VALUES 
    (1, 'en', 'Artificial Intelligence'),
    (1, 'it', 'Intelligenza Artificiale'),
    (1, 'es', 'Inteligencia Artificial'),
    (1, 'fr', 'Intelligence Artificielle'),
    (1, 'de', 'Künstliche Intelligenz'),
    -- Sustainability
    (2, 'en', 'Sustainability'),
    (2, 'it', 'Sostenibilità'),
    (2, 'es', 'Sostenibilidad'),
    (2, 'fr', 'Durabilité'),
    (2, 'de', 'Nachhaltigkeit'),
    -- Fintech
    (3, 'en', 'Fintech'),
    (3, 'it', 'Fintech'),
    (3, 'es', 'Fintech'),
    (3, 'fr', 'Fintech'),
    (3, 'de', 'Fintech'),
    -- HealthTech
    (4, 'en', 'HealthTech'),
    (4, 'it', 'HealthTech'),
    (4, 'es', 'HealthTech'),
    (4, 'fr', 'HealthTech'),
    (4, 'de', 'HealthTech'),
    -- E-commerce
    (5, 'en', 'E-commerce'),
    (5, 'it', 'E-commerce'),
    (5, 'es', 'Comercio Electrónico'),
    (5, 'fr', 'Commerce Électronique'),
    (5, 'de', 'E-Commerce'),
    -- Blockchain
    (6, 'en', 'Blockchain'),
    (6, 'it', 'Blockchain'),
    (6, 'es', 'Blockchain'),
    (6, 'fr', 'Blockchain'),
    (6, 'de', 'Blockchain'),
    -- Cybersecurity
    (7, 'en', 'Cybersecurity'),
    (7, 'it', 'Cybersecurity'),
    (7, 'es', 'Ciberseguridad'),
    (7, 'fr', 'Cybersécurité'),
    (7, 'de', 'Cybersicherheit'),
    -- EdTech
    (8, 'en', 'EdTech'),
    (8, 'it', 'EdTech'),
    (8, 'es', 'EdTech'),
    (8, 'fr', 'EdTech'),
    (8, 'de', 'EdTech'),
    -- Clean Energy
    (9, 'en', 'Clean Energy'),
    (9, 'it', 'Energia Pulita'),
    (9, 'es', 'Energía Limpia'),
    (9, 'fr', 'Énergie Propre'),
    (9, 'de', 'Saubere Energie'),
    -- Agritech
    (10, 'en', 'Agritech'),
    (10, 'it', 'Agritech'),
    (10, 'es', 'Agritech'),
    (10, 'fr', 'Agritech'),
    (10, 'de', 'Agritech'),
    -- SpaceTech
    (11, 'en', 'SpaceTech'),
    (11, 'it', 'SpaceTech'),
    (11, 'es', 'SpaceTech'),
    (11, 'fr', 'SpaceTech'),
    (11, 'de', 'SpaceTech'),
    -- AI Ethics
    (12, 'en', 'AI Ethics'),
    (12, 'it', 'Etica dell\''IA'),
    (12, 'es', 'Ética de la IA'),
    (12, 'fr', 'Éthique de l\''IA'),
    (12, 'de', 'KI-Ethik'),
    -- Quantum Computing
    (13, 'en', 'Quantum Computing'),
    (13, 'it', 'Computazione Quantistica'),
    (13, 'es', 'Computación Cuántica'),
    (13, 'fr', 'Informatique Quantique'),
    (13, 'de', 'Quantencomputing'),
    -- Robotics
    (14, 'en', 'Robotics'),
    (14, 'it', 'Robotica'),
    (14, 'es', 'Robótica'),
    (14, 'fr', 'Robotique'),
    (14, 'de', 'Robotik'),
    -- Virtual Reality
    (15, 'en', 'Virtual Reality'),
    (15, 'it', 'Realtà Virtuale'),
    (15, 'es', 'Realidad Virtual'),
    (15, 'fr', 'Réalité Virtuelle'),
    (15, 'de', 'Virtuelle Realität'),
    -- Augmented Reality
    (16, 'en', 'Augmented Reality'),
    (16, 'it', 'Realtà Aumentata'),
    (16, 'es', 'Realidad Aumentada'),
    (16, 'fr', 'Réalité Augmentée'),
    (16, 'de', 'Erweiterte Realität'),
    -- IoT
    (17, 'en', 'Internet of Things (IoT)'),
    (17, 'it', 'Internet delle Cose (IoT)'),
    (17, 'es', 'Internet de las Cosas (IoT)'),
    (17, 'fr', 'Internet des Objets (IoT)'),
    (17, 'de', 'Internet der Dinge (IoT)'),
    -- Big Data
    (18, 'en', 'Big Data'),
    (18, 'it', 'Big Data'),
    (18, 'es', 'Big Data'),
    (18, 'fr', 'Big Data'),
    (18, 'de', 'Big Data'),
    -- Cloud Computing
    (19, 'en', 'Cloud Computing'),
    (19, 'it', 'Cloud Computing'),
    (19, 'es', 'Computación en la Nube'),
    (19, 'fr', 'Cloud Computing'),
    (19, 'de', 'Cloud Computing'),
    -- 5G Technology
    (20, 'en', '5G Technology'),
    (20, 'it', 'Tecnologia 5G'),
    (20, 'es', 'Tecnología 5G'),
    (20, 'fr', 'Technologie 5G'),
    (20, 'de', '5G-Technologie');

INSERT INTO public.skill_types (id) VALUES 
    (1), (2), (3), (4), (5), (6), (7), (8), (9), (10),
    (11), (12), (13), (14), (15), (16), (17), (18), (19), (20);

INSERT INTO public.skill_translations (skill_id, language_code, name)
VALUES 
    -- Product Management
    (1, 'en', 'Product Management'),
    (1, 'it', 'Gestione del Prodotto'),
    (1, 'es', 'Gestión de Producto'),
    (1, 'fr', 'Gestion de Produit'),
    (1, 'de', 'Produktmanagement'),
    -- Marketing/Growth
    (2, 'en', 'Marketing/Growth'),
    (2, 'it', 'Marketing/Crescita'),
    (2, 'es', 'Marketing/Crecimiento'),
    (2, 'fr', 'Marketing/Croissance'),
    (2, 'de', 'Marketing/Wachstum'),
    -- Software Development
    (3, 'en', 'Software Development'),
    (3, 'it', 'Sviluppo Software'),
    (3, 'es', 'Desarrollo de Software'),
    (3, 'fr', 'Développement de Logiciels'),
    (3, 'de', 'Softwareentwicklung'),
    -- Data Science
    (4, 'en', 'Data Science'),
    (4, 'it', 'Scienza dei Dati'),
    (4, 'es', 'Ciencia de Datos'),
    (4, 'fr', 'Science des Données'),
    (4, 'de', 'Datenwissenschaft'),
    -- UX/UI Design
    (5, 'en', 'UX/UI Design'),
    (5, 'it', 'Design UX/UI'),
    (5, 'es', 'Diseño UX/UI'),
    (5, 'fr', 'Conception UX/UI'),
    (5, 'de', 'UX/UI-Design'),
    -- Business Strategy
    (6, 'en', 'Business Strategy'),
    (6, 'it', 'Strategia Aziendale'),
    (6, 'es', 'Estrategia Empresarial'),
    (6, 'fr', 'Stratégie d\''Entreprise'),
    (6, 'de', 'Unternehmensstrategie'),
    -- Financial Planning
    (7, 'en', 'Financial Planning'),
    (7, 'it', 'Pianificazione Finanziaria'),
    (7, 'es', 'Planificación Financiera'),
    (7, 'fr', 'Planification Financière'),
    (7, 'de', 'Finanzplanung'),
    -- Sales
    (8, 'en', 'Sales'),
    (8, 'it', 'Vendite'),
    (8, 'es', 'Ventas'),
    (8, 'fr', 'Ventes'),
    (8, 'de', 'Verkauf'),
    -- Customer Support
    (9, 'en', 'Customer Support'),
    (9, 'it', 'Supporto Clienti'),
    (9, 'es', 'Soporte al Cliente'),
    (9, 'fr', 'Support Client'),
    (9, 'de', 'Kundensupport'),
    -- Project Management
    (10, 'en', 'Project Management'),
    (10, 'it', 'Gestione dei Progetti'),
    (10, 'es', 'Gestión de Proyectos'),
    (10, 'fr', 'Gestion de Projet'),
    (10, 'de', 'Projektmanagement'),
    -- Machine Learning
    (11, 'en', 'Machine Learning'),
    (11, 'it', 'Apprendimento Automatico'),
    (11, 'es', 'Aprendizaje Automático'),
    (11, 'fr', 'Apprentissage Automatique'),
    (11, 'de', 'Maschinelles Lernen'),
    -- Cybersecurity
    (12, 'en', 'Cybersecurity'),
    (12, 'it', 'Cybersecurity'),
    (12, 'es', 'Ciberseguridad'),
    (12, 'fr', 'Cybersécurité'),
    (12, 'de', 'Cybersicherheit'),
    -- DevOps
    (13, 'en', 'DevOps'),
    (13, 'it', 'DevOps'),
    (13, 'es', 'DevOps'),
    (13, 'fr', 'DevOps'),
    (13, 'de', 'DevOps'),
    -- Cloud Architecture
    (14, 'en', 'Cloud Architecture'),
    (14, 'it', 'Architettura Cloud'),
    (14, 'es', 'Arquitectura en la Nube'),
    (14, 'fr', 'Architecture Cloud'),
    (14, 'de', 'Cloud-Architektur'),
    -- AI Development
    (15, 'en', 'AI Development'),
    (15, 'it', 'Sviluppo di IA'),
    (15, 'es', 'Desarrollo de IA'),
    (15, 'fr', 'Développement d\''IA'),
    (15, 'de', 'KI-Entwicklung'),
    -- Blockchain Development
    (16, 'en', 'Blockchain Development'),
    (16, 'it', 'Sviluppo Blockchain'),
    (16, 'es', 'Desarrollo de Blockchain'),
    (16, 'fr', 'Développement Blockchain'),
    (16, 'de', 'Blockchain-Entwicklung'),
    -- Data Engineering
    (17, 'en', 'Data Engineering'),
    (17, 'it', 'Ingegneria dei Dati'),
    (17, 'es', 'Ingeniería de Datos'),
    (17, 'fr', 'Ingénierie des Données'),
    (17, 'de', 'Datenengineering'),
    -- Mobile App Development
    (18, 'en', 'Mobile App Development'),
    (18, 'it', 'Sviluppo di App Mobili'),
    (18, 'es', 'Desarrollo de Aplicaciones Móviles'),
    (18, 'fr', 'Développement d\''Applications Mobiles'),
    (18, 'de', 'Mobile-App-Entwicklung'),
    -- Web Development
    (19, 'en', 'Web Development'),
    (19, 'it', 'Sviluppo Web'),
    (19, 'es', 'Desarrollo Web'),
    (19, 'fr', 'Développement Web'),
    (19, 'de', 'Webentwicklung'),
    -- Game Development
    (20, 'en', 'Game Development'),
    (20, 'it', 'Sviluppo di Giochi'),
    (20, 'es', 'Desarrollo de Juegos'),
    (20, 'fr', 'Développement de Jeux'),
    (20, 'de', 'Spieleentwicklung');

INSERT INTO public.goal_types (id) VALUES 
    (1), (2), (3), (4), (5), (6), (7), (8), (9), (10),
    (11), (12), (13), (14), (15), (16), (17), (18), (19), (20);

INSERT INTO public.goal_translations (goal_id, language_code, name)
VALUES 
    -- User Acquisition
    (1, 'en', 'User Acquisition'),
    (1, 'it', 'Acquisizione Utenti'),
    (1, 'es', 'Adquisición de Usuarios'),
    (1, 'fr', 'Acquisition d\''Utilisateurs'),
    (1, 'de', 'Nutzerakquise'),
    -- Fundraising
    (2, 'en', 'Fundraising'),
    (2, 'it', 'Raccolta Fondi'),
    (2, 'es', 'Recaudación de Fondos'),
    (2, 'fr', 'Collecte de Fonds'),
    (2, 'de', 'Fundraising'),
    -- Product Launch
    (3, 'en', 'Product Launch'),
    (3, 'it', 'Lancio del Prodotto'),
    (3, 'es', 'Lanzamiento de Producto'),
    (3, 'fr', 'Lancement de Produit'),
    (3, 'de', 'Produkteinführung'),
    -- Market Expansion
    (4, 'en', 'Market Expansion'),
    (4, 'it', 'Espansione del Mercato'),
    (4, 'es', 'Expansión de Mercado'),
    (4, 'fr', 'Expansion du Marché'),
    (4, 'de', 'Marktexpansion'),
    -- Team Building
    (5, 'en', 'Team Building'),
    (5, 'it', 'Costruzione del Team'),
    (5, 'es', 'Construcción de Equipo'),
    (5, 'fr', 'Construction d\''Équipe'),
    (5, 'de', 'Teambuilding'),
    -- Brand Awareness
    (6, 'en', 'Brand Awareness'),
    (6, 'it', 'Consapevolezza del Marchio'),
    (6, 'es', 'Conciencia de Marca'),
    (6, 'fr', 'Notoriété de la Marque'),
    (6, 'de', 'Markenbekanntheit'),
    -- Customer Retention
    (7, 'en', 'Customer Retention'),
    (7, 'it', 'Fidelizzazione dei Clienti'),
    (7, 'es', 'Retención de Clientes'),
    (7, 'fr', 'Fidélisation des Clients'),
    (7, 'de', 'Kundenbindung'),
    -- Revenue Growth
    (8, 'en', 'Revenue Growth'),
    (8, 'it', 'Crescita dei Ricavi'),
    (8, 'es', 'Crecimiento de Ingresos'),
    (8, 'fr', 'Croissance des Revenus'),
    (8, 'de', 'Umsatzwachstum'),
    -- Product Improvement
    (9, 'en', 'Product Improvement'),
    (9, 'it', 'Miglioramento del Prodotto'),
    (9, 'es', 'Mejora del Producto'),
    (9, 'fr', 'Amélioration du Produit'),
    (9, 'de', 'Produktverbesserung'),
    -- International Expansion
    (10, 'en', 'International Expansion'),
    (10, 'it', 'Espansione Internazionale'),
    (10, 'es', 'Expansión Internacional'),
    (10, 'fr', 'Expansion Internationale'),
    (10, 'de', 'Internationale Expansion'),
    -- Partnerships
    (11, 'en', 'Partnerships'),
    (11, 'it', 'Partnership'),
    (11, 'es', 'Asociaciones'),
    (11, 'fr', 'Partenariats'),
    (11, 'de', 'Partnerschaften'),
    -- Innovation
    (12, 'en', 'Innovation'),
    (12, 'it', 'Innovazione'),
    (12, 'es', 'Innovación'),
    (12, 'fr', 'Innovation'),
    (12, 'de', 'Innovation'),
    -- Operational Efficiency
    (13, 'en', 'Operational Efficiency'),
    (13, 'it', 'Efficienza Operativa'),
    (13, 'es', 'Eficiencia Operativa'),
    (13, 'fr', 'Efficacité Opérationnelle'),
    (13, 'de', 'Operative Effizienz'),
    -- Customer Satisfaction
    (14, 'en', 'Customer Satisfaction'),
    (14, 'it', 'Soddisfazione del Cliente'),
    (14, 'es', 'Satisfacción del Cliente'),
    (14, 'fr', 'Satisfaction des Clients'),
    (14, 'de', 'Kundenzufriedenheit'),
    -- Market Leadership
    (15, 'en', 'Market Leadership'),
    (15, 'it', 'Leadership di Mercato'),
    (15, 'es', 'Liderazgo de Mercado'),
    (15, 'fr', 'Leadership du Marché'),
    (15, 'de', 'Marktführerschaft'),
    -- Talent Acquisition
    (16, 'en', 'Talent Acquisition'),
    (16, 'it', 'Acquisizione di Talenti'),
    (16, 'es', 'Adquisición de Talento'),
    (16, 'fr', 'Acquisition de Talents'),
    (16, 'de', 'Talentakquise'),
    -- Digital Transformation
    (17, 'en', 'Digital Transformation'),
    (17, 'it', 'Trasformazione Digitale'),
    (17, 'es', 'Transformación Digital'),
    (17, 'fr', 'Transformation Numérique'),
    (17, 'de', 'Digitale Transformation'),
    -- Sustainability Goals
    (18, 'en', 'Sustainability Goals'),
    (18, 'it', 'Obiettivi di Sostenibilità'),
    (18, 'es', 'Objetivos de Sostenibilidad'),
    (18, 'fr', 'Objectifs de Durabilité'),
    (18, 'de', 'Nachhaltigkeitsziele'),
    -- Data-Driven Decisions
    (19, 'en', 'Data-Driven Decisions'),
    (19, 'it', 'Decisioni Basate sui Dati'),
    (19, 'es', 'Decisiones Basadas en Datos'),
    (19, 'fr', 'Décisions Basées sur les Données'),
    (19, 'de', 'Datenbasierte Entscheidungen'),
    -- Scaling Operations
    (20, 'en', 'Scaling Operations'),
    (20, 'it', 'Scalabilità delle Operazioni'),
    (20, 'es', 'Escalabilidad de Operaciones'),
    (20, 'fr', 'Mise à l\''Échelle des Opérations'),
    (20, 'de', 'Skalierung der Betriebe');