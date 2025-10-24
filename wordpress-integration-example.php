<?php
/**
 * Stachly WordPress Theme - Functions
 *
 * Dit bestand bevat alle benodigde code voor WordPress setup
 * Plaats dit in: wp-content/themes/stachly-theme/functions.php
 */

// =============================================================================
// 1. CUSTOM POST TYPES REGISTREREN
// =============================================================================

function stachly_register_post_types() {

    // Blog Post
    register_post_type('blog_post', array(
        'labels' => array(
            'name' => 'Blog Posts',
            'singular_name' => 'Blog Post',
            'add_new' => 'Nieuwe Blog Post',
            'add_new_item' => 'Nieuwe Blog Post Toevoegen',
            'edit_item' => 'Blog Post Bewerken',
            'view_item' => 'Blog Post Bekijken',
            'search_items' => 'Blog Posts Zoeken',
        ),
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true, // ESSENTIEEL voor REST API
        'has_archive' => true,
        'rewrite' => array('slug' => 'blog'),
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'author', 'revisions'),
        'menu_icon' => 'dashicons-welcome-write-blog',
        'menu_position' => 5,
    ));

    // Project
    register_post_type('project', array(
        'labels' => array(
            'name' => 'Projecten',
            'singular_name' => 'Project',
            'add_new' => 'Nieuw Project',
            'add_new_item' => 'Nieuw Project Toevoegen',
            'edit_item' => 'Project Bewerken',
        ),
        'public' => true,
        'show_in_rest' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'projecten'),
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-portfolio',
        'menu_position' => 6,
    ));

    // Team Member
    register_post_type('team_member', array(
        'labels' => array(
            'name' => 'Team Leden',
            'singular_name' => 'Team Lid',
            'add_new' => 'Nieuw Team Lid',
        ),
        'public' => true,
        'show_in_rest' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'team'),
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-groups',
        'menu_position' => 7,
    ));

    // Career
    register_post_type('career', array(
        'labels' => array(
            'name' => 'Vacatures',
            'singular_name' => 'Vacature',
            'add_new' => 'Nieuwe Vacature',
        ),
        'public' => true,
        'show_in_rest' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'vacatures'),
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-businessman',
        'menu_position' => 8,
    ));

    // Handbook
    register_post_type('handbook', array(
        'labels' => array(
            'name' => 'Handbook',
            'singular_name' => 'Handbook Pagina',
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => true, // Voor parent/child structuur
        'has_archive' => true,
        'rewrite' => array('slug' => 'handbook'),
        'supports' => array('title', 'editor', 'page-attributes'),
        'menu_icon' => 'dashicons-book',
        'menu_position' => 9,
    ));

    // Landing Page
    register_post_type('landing_page', array(
        'labels' => array(
            'name' => 'Landing Pages',
            'singular_name' => 'Landing Page',
        ),
        'public' => true,
        'show_in_rest' => true,
        'has_archive' => false,
        'rewrite' => array('slug' => 'lp'),
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-admin-page',
        'menu_position' => 10,
    ));

    // Recognition
    register_post_type('recognition', array(
        'labels' => array(
            'name' => 'Awards',
            'singular_name' => 'Award',
        ),
        'public' => true,
        'show_in_rest' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'awards'),
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-awards',
        'menu_position' => 11,
    ));
}
add_action('init', 'stachly_register_post_types');

// =============================================================================
// 2. TAXONOMIES REGISTREREN
// =============================================================================

function stachly_register_taxonomies() {

    // Project Tags
    register_taxonomy('project_tag', 'project', array(
        'labels' => array(
            'name' => 'Project Tags',
            'singular_name' => 'Project Tag',
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => false,
        'rewrite' => array('slug' => 'project-tag'),
    ));

    // Blog Categories
    register_taxonomy('blog_category', 'blog_post', array(
        'labels' => array(
            'name' => 'Blog Categorieën',
            'singular_name' => 'Blog Categorie',
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => true,
        'rewrite' => array('slug' => 'blog-categorie'),
    ));

    // Blog Tags
    register_taxonomy('blog_tag', 'blog_post', array(
        'labels' => array(
            'name' => 'Blog Tags',
            'singular_name' => 'Blog Tag',
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => false,
        'rewrite' => array('slug' => 'blog-tag'),
    ));
}
add_action('init', 'stachly_register_taxonomies');

// =============================================================================
// 3. REST API CONFIGURATIE
// =============================================================================

/**
 * Voeg ACF fields toe aan REST API response
 */
function stachly_add_acf_to_rest_api() {

    $post_types = array(
        'page',
        'blog_post',
        'project',
        'team_member',
        'career',
        'handbook',
        'landing_page',
        'recognition'
    );

    foreach ($post_types as $post_type) {
        register_rest_field($post_type, 'acf', array(
            'get_callback' => function($object) {
                $post_id = $object['id'];
                return get_fields($post_id);
            },
            'update_callback' => null,
            'schema' => null,
        ));

        // Voeg featured image URL toe
        register_rest_field($post_type, 'featured_image_url', array(
            'get_callback' => function($object) {
                if ($object['featured_media']) {
                    $image = wp_get_attachment_image_src($object['featured_media'], 'full');
                    return $image ? $image[0] : null;
                }
                return null;
            },
        ));

        // Voeg author informatie toe
        register_rest_field($post_type, 'author_info', array(
            'get_callback' => function($object) {
                $author_id = $object['author'];
                $author = get_user_by('id', $author_id);

                if ($author) {
                    return array(
                        'id' => $author_id,
                        'name' => $author->display_name,
                        'avatar' => get_avatar_url($author_id),
                        'url' => get_author_posts_url($author_id),
                    );
                }
                return null;
            },
        ));
    }
}
add_action('rest_api_init', 'stachly_add_acf_to_rest_api');

/**
 * Enable CORS voor headless setup
 */
function stachly_enable_cors() {
    // Pas dit aan naar je SvelteKit domain in productie
    $allowed_origins = array(
        'http://localhost:5173',  // SvelteKit dev
        'http://localhost:4173',  // SvelteKit preview
        'https://jouw-productie-site.com'
    );

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, $allowed_origins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }

    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce');
    header('Access-Control-Allow-Credentials: true');

    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
}
add_action('rest_api_init', 'stachly_enable_cors');
add_action('init', 'stachly_enable_cors');

/**
 * Custom REST API endpoints
 */
function stachly_register_custom_routes() {

    // Endpoint voor alle content (voor sitemap/navigation)
    register_rest_route('stachly/v1', '/all-content', array(
        'methods' => 'GET',
        'callback' => 'stachly_get_all_content',
        'permission_callback' => '__return_true',
    ));

    // Endpoint voor navigation menu
    register_rest_route('stachly/v1', '/menu/(?P<location>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'stachly_get_menu',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'stachly_register_custom_routes');

function stachly_get_all_content() {
    $post_types = array('page', 'blog_post', 'project', 'team_member', 'career', 'handbook');
    $all_content = array();

    foreach ($post_types as $post_type) {
        $posts = get_posts(array(
            'post_type' => $post_type,
            'posts_per_page' => -1,
            'post_status' => 'publish',
        ));

        foreach ($posts as $post) {
            $all_content[] = array(
                'id' => $post->ID,
                'title' => $post->post_title,
                'slug' => $post->post_name,
                'type' => $post_type,
                'url' => get_permalink($post->ID),
                'modified' => $post->post_modified,
            );
        }
    }

    return rest_ensure_response($all_content);
}

function stachly_get_menu($data) {
    $location = $data['location'];
    $menu = wp_get_nav_menu_items($location);

    if (!$menu) {
        return new WP_Error('no_menu', 'Menu niet gevonden', array('status' => 404));
    }

    $menu_items = array();
    foreach ($menu as $item) {
        $menu_items[] = array(
            'id' => $item->ID,
            'title' => $item->title,
            'url' => $item->url,
            'parent' => $item->menu_item_parent,
            'order' => $item->menu_order,
        );
    }

    return rest_ensure_response($menu_items);
}

// =============================================================================
// 4. ACF CONFIGURATIE
// =============================================================================

/**
 * ACF Options Page (voor site-wide instellingen)
 */
if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
        'page_title' => 'Site Instellingen',
        'menu_title' => 'Site Instellingen',
        'menu_slug' => 'site-instellingen',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-admin-generic',
        'redirect' => false,
        'show_in_rest' => true, // REST API support
    ));
}

/**
 * ACF JSON save point (voor version control)
 */
add_filter('acf/settings/save_json', function($path) {
    return get_stylesheet_directory() . '/acf-json';
});

add_filter('acf/settings/load_json', function($paths) {
    $paths[] = get_stylesheet_directory() . '/acf-json';
    return $paths;
});

// =============================================================================
// 5. THEME SUPPORT & FEATURES
// =============================================================================

function stachly_theme_setup() {
    // Featured Images
    add_theme_support('post-thumbnails');

    // Custom image sizes
    add_image_size('hero-large', 1920, 1080, true);
    add_image_size('project-thumbnail', 800, 600, true);
    add_image_size('team-photo', 400, 400, true);
    add_image_size('blog-featured', 1200, 630, true);

    // Navigation Menus
    register_nav_menus(array(
        'primary' => 'Hoofdmenu',
        'footer' => 'Footer Menu',
    ));

    // HTML5 support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    // Title tag support
    add_theme_support('title-tag');
}
add_action('after_setup_theme', 'stachly_theme_setup');

// =============================================================================
// 6. CUSTOM QUERY OPTIMALISATIES
// =============================================================================

/**
 * Optimaliseer REST API queries
 */
function stachly_optimize_rest_queries($args, $request) {
    // Default per_page verhogen voor betere performance
    if (!isset($args['posts_per_page'])) {
        $args['posts_per_page'] = 50;
    }

    // Cache control
    if (!is_user_logged_in()) {
        header('Cache-Control: max-age=3600'); // 1 uur cache
    }

    return $args;
}
add_filter('rest_post_query', 'stachly_optimize_rest_queries', 10, 2);

/**
 * Disable WordPress embeds (performance)
 */
function stachly_disable_embeds() {
    remove_action('rest_api_init', 'wp_oembed_register_route');
    remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');
}
add_action('init', 'stachly_disable_embeds');

// =============================================================================
// 7. SECURITY & CLEANUP
// =============================================================================

/**
 * Verberg WordPress versie
 */
remove_action('wp_head', 'wp_generator');

/**
 * Disable XML-RPC (security)
 */
add_filter('xmlrpc_enabled', '__return_false');

/**
 * Verwijder overbodige header tags
 */
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head');

/**
 * Custom JWT authentication (optioneel, voor beveiligde endpoints)
 */
function stachly_cors_allow_any_origin($headers) {
    $headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type, X-WP-Nonce';
    return $headers;
}
add_filter('rest_pre_serve_request', function($served, $result, $request, $server) {
    $server->send_header('Access-Control-Allow-Credentials', 'true');
    return $served;
}, 10, 4);

// =============================================================================
// 8. HELPER FUNCTIONS
// =============================================================================

/**
 * Get related posts (voor blog/projects)
 */
function stachly_get_related_posts($post_id, $post_type = 'blog_post', $limit = 3) {
    $tags = wp_get_post_terms($post_id, $post_type === 'blog_post' ? 'blog_tag' : 'project_tag');
    $tag_ids = array();

    foreach ($tags as $tag) {
        $tag_ids[] = $tag->term_id;
    }

    if (empty($tag_ids)) {
        return array();
    }

    $args = array(
        'post_type' => $post_type,
        'posts_per_page' => $limit,
        'post__not_in' => array($post_id),
        'tax_query' => array(
            array(
                'taxonomy' => $post_type === 'blog_post' ? 'blog_tag' : 'project_tag',
                'field' => 'term_id',
                'terms' => $tag_ids,
            ),
        ),
    );

    return get_posts($args);
}

/**
 * Get ACF image met fallback
 */
function stachly_get_acf_image($image, $size = 'full') {
    if (is_array($image)) {
        return $image['sizes'][$size] ?? $image['url'] ?? '';
    } elseif (is_numeric($image)) {
        return wp_get_attachment_image_url($image, $size);
    }
    return $image;
}

// =============================================================================
// 9. CACHE PURGING (voor headless setup)
// =============================================================================

/**
 * Trigger cache clear in frontend (bijv. via webhook)
 */
function stachly_trigger_frontend_rebuild($post_id) {
    // Stuur webhook naar Vercel/Netlify voor rebuild
    $webhook_url = get_option('frontend_rebuild_webhook');

    if ($webhook_url) {
        wp_remote_post($webhook_url, array(
            'body' => json_encode(array(
                'post_id' => $post_id,
                'post_type' => get_post_type($post_id),
                'action' => 'rebuild',
            )),
            'headers' => array('Content-Type' => 'application/json'),
        ));
    }
}
add_action('save_post', 'stachly_trigger_frontend_rebuild');

// =============================================================================
// 10. YOAST SEO INTEGRATION
// =============================================================================

/**
 * Voeg Yoast SEO data toe aan REST API
 */
function stachly_add_yoast_to_rest() {
    if (!class_exists('WPSEO_Frontend')) {
        return;
    }

    $post_types = array('page', 'blog_post', 'project', 'team_member', 'career', 'handbook');

    foreach ($post_types as $post_type) {
        register_rest_field($post_type, 'yoast_meta', array(
            'get_callback' => function($object) {
                $post_id = $object['id'];

                return array(
                    'title' => get_post_meta($post_id, '_yoast_wpseo_title', true),
                    'description' => get_post_meta($post_id, '_yoast_wpseo_metadesc', true),
                    'og_title' => get_post_meta($post_id, '_yoast_wpseo_opengraph-title', true),
                    'og_description' => get_post_meta($post_id, '_yoast_wpseo_opengraph-description', true),
                    'og_image' => get_post_meta($post_id, '_yoast_wpseo_opengraph-image', true),
                    'canonical' => get_post_meta($post_id, '_yoast_wpseo_canonical', true),
                );
            },
        ));
    }
}
add_action('rest_api_init', 'stachly_add_yoast_to_rest');

?>
