SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: payment_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.payment_type AS ENUM (
    'cash',
    'credit_card'
);


--
-- Name: promo_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.promo_type AS ENUM (
    'fds',
    'restaurant'
);


--
-- Name: status_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.status_type AS ENUM (
    'in_progress',
    'complete'
);


--
-- Name: check_has_promotions_exist(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.check_has_promotions_exist() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      DECLARE 
        exist integer; 
      BEGIN
        SELECT DISTINCT 1 INTO exist
          FROM has_promotions
          WHERE restaurant_promotion_id = NEW.promotion_id;
        IF exist IS NULL THEN
          RAISE exception 'Must insert a tuple into has_promotions upon inserting into restaurant_promotions';
        END IF;
        RETURN NULL;
      END;
      $$;


--
-- Name: check_promotions_constraint(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.check_promotions_constraint() RETURNS trigger
    LANGUAGE plpgsql
    AS $$    
      BEGIN
        IF NOT (
          EXISTS (SELECT 1 FROM fds_promotions WHERE promotion_id = NEW.id)
          OR EXISTS (SELECT 1 FROM restaurant_promotions WHERE promotion_id = NEW.id)
        ) THEN
          RAISE EXCEPTION 'Must insert a tuple into the corresponding subtable of promotions';
        END IF;
        RETURN NULL;
      END;
      $$;


--
-- Name: comprises_delete_orders_constraint(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.comprises_delete_orders_constraint() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      BEGIN
        IF (
          EXISTS (SELECT 1
                  FROM Orders O
                  WHERE O.oid = OLD.oid)
        ) THEN
          RAISE EXCEPTION 'Must also delete Order with its final remaining Comprises record being deleted';
        END IF;
        RETURN OLD;
      END;
      $$;


--
-- Name: delivers_delete_orders_constraint(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.delivers_delete_orders_constraint() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      BEGIN
        IF (
          EXISTS (SELECT 1
                  FROM Orders O
                  WHERE O.oid = OLD.oid)
        ) THEN
          RAISE EXCEPTION 'Must also delete Order related to Delivers record being deleted';
        END IF;
        RETURN OLD;
      END;
      $$;


--
-- Name: orders_comprises_total_participation(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.orders_comprises_total_participation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      BEGIN
        IF NOT (
          EXISTS (SELECT 1
                  FROM Comprises C
                  WHERE C.oid = NEW.oid)
        ) THEN
          RAISE EXCEPTION 'Must insert a tuple for current Order into Comprises table';
        END IF;
        RETURN NULL;
      END;
      $$;


--
-- Name: orders_delivers_total_participation(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.orders_delivers_total_participation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      BEGIN
        IF NOT (
          EXISTS (SELECT 1
                  FROM Delivers D
                  WHERE D.oid = NEW.oid)
        ) THEN
          RAISE EXCEPTION 'Must insert a tuple for current Order into Delivers table';
        END IF;
        RETURN NULL;
      END;
      $$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admins (
    id bigint NOT NULL,
    user_id bigint,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admins_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: comprises; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comprises (
    oid bigint NOT NULL,
    food_id bigint NOT NULL,
    quantity bigint NOT NULL,
    CONSTRAINT quantity_not_zero CHECK ((quantity > 0))
);


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    id bigint NOT NULL,
    user_id bigint,
    can bigint,
    cvv integer,
    "rewardPoints" integer DEFAULT 0 NOT NULL,
    "locationHistory" character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: delivers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivers (
    oid bigint NOT NULL,
    rider_id bigint NOT NULL,
    customer_location character varying(500) NOT NULL,
    order_time time without time zone NOT NULL,
    depart_to_restaurant_time timestamp without time zone,
    arrive_at_restaurant_time timestamp without time zone,
    depart_to_customer_time timestamp without time zone,
    arrive_at_customer_time timestamp without time zone
);


--
-- Name: fds_promotions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fds_promotions (
    promotion_id bigint NOT NULL,
    p_type public.promo_type DEFAULT 'fds'::public.promo_type NOT NULL,
    CONSTRAINT fds_promotions_p_type CHECK ((p_type = 'fds'::public.promo_type))
);


--
-- Name: foods; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.foods (
    id bigint NOT NULL,
    f_name character varying(100) NOT NULL,
    daily_limit integer NOT NULL,
    num_orders integer DEFAULT 0 NOT NULL,
    price numeric NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    restaurant_id bigint NOT NULL,
    ms_url_id bigint NOT NULL,
    CONSTRAINT foods_daily_limit CHECK ((daily_limit >= 0)),
    CONSTRAINT foods_num_orders CHECK ((num_orders >= 0)),
    CONSTRAINT foods_price CHECK ((price >= (0)::numeric))
);


--
-- Name: foods_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.foods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: foods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.foods_id_seq OWNED BY public.foods.id;


--
-- Name: has_promotions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.has_promotions (
    restaurant_id bigint NOT NULL,
    restaurant_promotion_id bigint NOT NULL
);


--
-- Name: managers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.managers (
    id bigint NOT NULL,
    user_id bigint,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: managers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.managers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: managers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.managers_id_seq OWNED BY public.managers.id;


--
-- Name: menu_sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menu_sections (
    url_id bigint NOT NULL,
    ms_name character varying(100) NOT NULL,
    restaurant_id bigint NOT NULL
);


--
-- Name: menu_sections_url_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.menu_sections_url_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: menu_sections_url_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.menu_sections_url_id_seq OWNED BY public.menu_sections.url_id;


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    oid bigint DEFAULT nextval('public.orders_id_seq'::regclass) NOT NULL,
    customer_id bigint NOT NULL,
    promo_id bigint,
    restaurant_id bigint NOT NULL,
    point_offset bigint DEFAULT 0 NOT NULL,
    payment_method public.payment_type NOT NULL,
    delivery_fee numeric DEFAULT 0 NOT NULL,
    date_time timestamp without time zone NOT NULL,
    status public.status_type DEFAULT 'in_progress'::public.status_type NOT NULL
);


--
-- Name: promotions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.promotions (
    id bigint NOT NULL,
    p_name character varying(300) NOT NULL,
    p_type public.promo_type NOT NULL,
    promocode character varying(200) NOT NULL,
    num_redeemed integer DEFAULT 0 NOT NULL,
    max_redeem integer NOT NULL,
    start_datetime timestamp with time zone NOT NULL,
    end_datetime timestamp with time zone NOT NULL,
    percentage integer NOT NULL,
    CONSTRAINT promotions_end_date CHECK ((end_datetime > start_datetime)),
    CONSTRAINT promotions_max_redeem CHECK (((max_redeem >= 0) AND (max_redeem >= num_redeemed))),
    CONSTRAINT promotions_num_redeemed CHECK (((num_redeemed >= 0) AND (num_redeemed <= max_redeem))),
    CONSTRAINT promotions_percentage_check CHECK (((percentage >= 0) AND (percentage <= 100)))
);


--
-- Name: promotions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.promotions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: promotions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.promotions_id_seq OWNED BY public.promotions.id;


--
-- Name: restaurant_promotions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.restaurant_promotions (
    promotion_id bigint NOT NULL,
    p_type public.promo_type DEFAULT 'restaurant'::public.promo_type NOT NULL,
    CONSTRAINT restaurant_promotions_p_type CHECK ((p_type = 'restaurant'::public.promo_type))
);


--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.restaurants (
    id bigint NOT NULL,
    name character varying(300) NOT NULL,
    min_order_cost numeric NOT NULL,
    address character varying(500) NOT NULL,
    manager_id bigint NOT NULL
);


--
-- Name: restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.restaurants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    oid bigint NOT NULL,
    rider_id bigint,
    rider_rating integer,
    food_review character varying(1000),
    CONSTRAINT rider_rating_bounds CHECK (((rider_rating > 0) AND (rider_rating <= 5)))
);


--
-- Name: riders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.riders (
    id bigint NOT NULL,
    user_id bigint,
    "currLocation" character varying,
    status character varying,
    fee double precision,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: riders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.riders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: riders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.riders_id_seq OWNED BY public.riders.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying DEFAULT ''::character varying NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    roles character varying DEFAULT ''::character varying,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip inet,
    last_sign_in_ip inet,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: foods id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.foods ALTER COLUMN id SET DEFAULT nextval('public.foods_id_seq'::regclass);


--
-- Name: managers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.managers ALTER COLUMN id SET DEFAULT nextval('public.managers_id_seq'::regclass);


--
-- Name: menu_sections url_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_sections ALTER COLUMN url_id SET DEFAULT nextval('public.menu_sections_url_id_seq'::regclass);


--
-- Name: promotions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions ALTER COLUMN id SET DEFAULT nextval('public.promotions_id_seq'::regclass);


--
-- Name: restaurants id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);


--
-- Name: riders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.riders ALTER COLUMN id SET DEFAULT nextval('public.riders_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: comprises comprises_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comprises
    ADD CONSTRAINT comprises_pkey PRIMARY KEY (oid, food_id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: delivers delivers_oid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivers
    ADD CONSTRAINT delivers_oid_key UNIQUE (oid);


--
-- Name: delivers delivers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivers
    ADD CONSTRAINT delivers_pkey PRIMARY KEY (oid, rider_id);


--
-- Name: fds_promotions fds_promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fds_promotions
    ADD CONSTRAINT fds_promotions_pkey PRIMARY KEY (promotion_id);


--
-- Name: foods foods_f_name_restaurant_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_f_name_restaurant_id_key UNIQUE (f_name, restaurant_id);


--
-- Name: foods foods_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_pkey PRIMARY KEY (id);


--
-- Name: has_promotions has_promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.has_promotions
    ADD CONSTRAINT has_promotions_pkey PRIMARY KEY (restaurant_id, restaurant_promotion_id);


--
-- Name: managers managers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.managers
    ADD CONSTRAINT managers_pkey PRIMARY KEY (id);


--
-- Name: menu_sections menu_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_sections
    ADD CONSTRAINT menu_sections_pkey PRIMARY KEY (ms_name, restaurant_id);


--
-- Name: menu_sections menu_sections_url_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_sections
    ADD CONSTRAINT menu_sections_url_id_key UNIQUE (url_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (oid);


--
-- Name: promotions promotions_id_p_type_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_id_p_type_key UNIQUE (id, p_type);


--
-- Name: promotions promotions_p_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_p_name_key UNIQUE (p_name);


--
-- Name: promotions promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_pkey PRIMARY KEY (id);


--
-- Name: promotions promotions_promocode_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_promocode_key UNIQUE (promocode);


--
-- Name: restaurant_promotions restaurant_promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant_promotions
    ADD CONSTRAINT restaurant_promotions_pkey PRIMARY KEY (promotion_id);


--
-- Name: restaurants restaurants_manager_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_manager_id_key UNIQUE (manager_id);


--
-- Name: restaurants restaurants_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_name_key UNIQUE (name);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (oid);


--
-- Name: riders riders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.riders
    ADD CONSTRAINT riders_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_admins_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_admins_on_user_id ON public.admins USING btree (user_id);


--
-- Name: index_customers_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_customers_on_user_id ON public.customers USING btree (user_id);


--
-- Name: index_managers_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_managers_on_user_id ON public.managers USING btree (user_id);


--
-- Name: index_riders_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_riders_on_user_id ON public.riders USING btree (user_id);


--
-- Name: index_users_on_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_email ON public.users USING btree (email);


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_reset_password_token ON public.users USING btree (reset_password_token);


--
-- Name: index_users_on_username; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_username ON public.users USING btree (username);


--
-- Name: comprises comprises_delete_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE CONSTRAINT TRIGGER comprises_delete_trigger AFTER DELETE ON public.comprises NOT DEFERRABLE INITIALLY IMMEDIATE FOR EACH ROW EXECUTE FUNCTION public.delivers_delete_orders_constraint();


--
-- Name: delivers delivers_delete_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE CONSTRAINT TRIGGER delivers_delete_trigger AFTER DELETE ON public.delivers NOT DEFERRABLE INITIALLY IMMEDIATE FOR EACH ROW EXECUTE FUNCTION public.delivers_delete_orders_constraint();


--
-- Name: orders orders_comprises_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE CONSTRAINT TRIGGER orders_comprises_trigger AFTER INSERT OR UPDATE OF oid ON public.orders DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.orders_comprises_total_participation();


--
-- Name: orders orders_delivers_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE CONSTRAINT TRIGGER orders_delivers_trigger AFTER INSERT OR UPDATE OF oid ON public.orders DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.orders_delivers_total_participation();


--
-- Name: promotions promotion_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE CONSTRAINT TRIGGER promotion_trigger AFTER INSERT OR UPDATE ON public.promotions DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.check_promotions_constraint();


--
-- Name: restaurant_promotions restaurant_promotion_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE CONSTRAINT TRIGGER restaurant_promotion_trigger AFTER INSERT OR UPDATE ON public.restaurant_promotions DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.check_has_promotions_exist();


--
-- Name: comprises comprises_food_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comprises
    ADD CONSTRAINT comprises_food_id_fkey FOREIGN KEY (food_id) REFERENCES public.foods(id);


--
-- Name: comprises comprises_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comprises
    ADD CONSTRAINT comprises_oid_fkey FOREIGN KEY (oid) REFERENCES public.orders(oid);


--
-- Name: delivers delivers_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivers
    ADD CONSTRAINT delivers_oid_fkey FOREIGN KEY (oid) REFERENCES public.orders(oid) ON DELETE CASCADE;


--
-- Name: delivers delivers_rider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivers
    ADD CONSTRAINT delivers_rider_id_fkey FOREIGN KEY (rider_id) REFERENCES public.riders(user_id);


--
-- Name: fds_promotions fds_promotions_promotion_id_p_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fds_promotions
    ADD CONSTRAINT fds_promotions_promotion_id_p_type_fkey FOREIGN KEY (promotion_id, p_type) REFERENCES public.promotions(id, p_type) MATCH FULL ON DELETE CASCADE;


--
-- Name: managers fk_rails_1306270b4d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.managers
    ADD CONSTRAINT fk_rails_1306270b4d FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: admins fk_rails_378b9734e4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT fk_rails_378b9734e4 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: customers fk_rails_9917eeaf5d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT fk_rails_9917eeaf5d FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: riders fk_rails_c5d0d20a0d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.riders
    ADD CONSTRAINT fk_rails_c5d0d20a0d FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: foods foods_ms_url_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_ms_url_id_fkey FOREIGN KEY (ms_url_id) REFERENCES public.menu_sections(url_id) ON DELETE CASCADE;


--
-- Name: foods foods_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE;


--
-- Name: has_promotions has_promotions_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.has_promotions
    ADD CONSTRAINT has_promotions_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE;


--
-- Name: has_promotions has_promotions_restaurant_promotion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.has_promotions
    ADD CONSTRAINT has_promotions_restaurant_promotion_id_fkey FOREIGN KEY (restaurant_promotion_id) REFERENCES public.restaurant_promotions(promotion_id) ON DELETE CASCADE;


--
-- Name: menu_sections menu_sections_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_sections
    ADD CONSTRAINT menu_sections_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE;


--
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(user_id);


--
-- Name: orders orders_promo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_promo_id_fkey FOREIGN KEY (promo_id) REFERENCES public.promotions(id);


--
-- Name: orders orders_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id);


--
-- Name: restaurant_promotions restaurant_promotions_promotion_id_p_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurant_promotions
    ADD CONSTRAINT restaurant_promotions_promotion_id_p_type_fkey FOREIGN KEY (promotion_id, p_type) REFERENCES public.promotions(id, p_type) MATCH FULL ON DELETE CASCADE;


--
-- Name: restaurants restaurants_manager_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_manager_id_fkey FOREIGN KEY (manager_id) REFERENCES public.managers(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_oid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_oid_fkey FOREIGN KEY (oid) REFERENCES public.orders(oid) ON DELETE CASCADE;


--
-- Name: reviews reviews_rider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_rider_id_fkey FOREIGN KEY (rider_id) REFERENCES public.riders(user_id);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO "schema_migrations" (version) VALUES
('20200215165756'),
('20200223103005'),
('20200223103016'),
('20200223103255'),
('20200223110049'),
('20200225011425'),
('20200312022449'),
('20200312032412'),
('20200314013024'),
('20200314021748'),
('20200314022934'),
('20200314023756'),
('20200314032347'),
('20200314052139'),
('20200316113951'),
('20200316115731'),
('20200316122828'),
('20200316125810'),
('20200316131147'),
('20200316132202'),
('20200317070245'),
('20200317072650');


