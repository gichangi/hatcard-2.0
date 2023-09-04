<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement(
            "
CREATE OR REPLACE VIEW public.view_vsp_routine_data
 AS
 SELECT DISTINCT dd.county,
    dd.periodid,
    dd.data_group,
    dd.data_sub_group,
    dd.value
   FROM ( SELECT alldata.county,
            alldata.periodid,
            alldata.data_group,
            alldata.data_sub_group,
            avg(alldata.value) AS value
           FROM ( SELECT dhis_data.total AS value,
                    vsp_data.county,
                    dhis_data.periodid,
                    vsp_data.indicator_on_khis,
                    vsp_data.category,
                    vsp_data.khis_uid,
                    vsp_data.data_group,
                    vsp_data.data_sub_group,
                    vsp_data.indicator,
                    vsp_data.data_source
                   FROM dhis_data
                     JOIN ( SELECT vsp.data_source,
                            vsp.category,
                            vsp.indicator_on_khis,
                            vsp.khis_uid,
                            vsp.county,
                            vsp.period,
                            vsp.data_group,
                            vsp.data_sub_group,
                            vsp.indicator,
                            vsp.value
                           FROM vsp_data vsp
                             JOIN ( SELECT DISTINCT t.county,
                                    t.period,
                                    t.data_group,
                                    t.data_sub_group,
                                    t.data_source,
                                    t.indicator,
                                    vsp_data_1.upload_id
                                   FROM ( SELECT DISTINCT vsp_data_2.county,
    vsp_data_2.period,
    vsp_data_2.data_group,
    vsp_data_2.data_sub_group,
    vsp_data_2.data_source,
    vsp_data_2.indicator,
    max(vsp_data_2.updated_at) OVER (PARTITION BY vsp_data_2.county, vsp_data_2.period, vsp_data_2.data_group, vsp_data_2.data_sub_group, vsp_data_2.indicator, vsp_data_2.data_source) AS max
   FROM vsp_data vsp_data_2) t
                                     JOIN vsp_data vsp_data_1 ON t.county::text = vsp_data_1.county::text AND t.period = vsp_data_1.period AND t.data_group = vsp_data_1.data_group AND t.data_sub_group = vsp_data_1.data_sub_group AND (t.data_source = vsp_data_1.data_source OR t.data_source IS NULL AND vsp_data_1.data_source IS NULL) AND t.indicator = vsp_data_1.indicator AND t.max = vsp_data_1.updated_at) a ON vsp.county::text = a.county::text AND vsp.period = a.period AND vsp.data_group = a.data_group AND vsp.data_sub_group = a.data_sub_group AND (vsp.data_source = a.data_source OR vsp.data_source IS NULL AND a.data_source IS NULL) AND vsp.indicator = a.indicator AND vsp.upload_id = a.upload_id) vsp_data ON split_part(dhis_data.organisationunitname, ' '::text, 1) = vsp_data.county::text AND dhis_data.dataid::text = vsp_data.khis_uid::text AND EXTRACT(year FROM to_date(dhis_data.periodid::text, 'YYYYMMDD'::text)) = EXTRACT(year FROM vsp_data.period)
                UNION ALL
                 SELECT vsp_data.value,
                    vsp_data.county,
                    dhisperiods.periodid,
                    vsp_data.indicator_on_khis,
                    vsp_data.category,
                    vsp_data.khis_uid,
                    vsp_data.data_group,
                    vsp_data.data_sub_group,
                    vsp_data.indicator,
                    vsp_data.data_source
                   FROM ( SELECT vsp.data_source,
                            vsp.category,
                            vsp.indicator_on_khis,
                            vsp.khis_uid,
                            vsp.county,
                            vsp.period,
                            vsp.data_group,
                            vsp.data_sub_group,
                            vsp.indicator,
                            vsp.value
                           FROM vsp_data vsp
                             JOIN ( SELECT DISTINCT t.county,
                                    t.period,
                                    t.data_group,
                                    t.data_sub_group,
                                    t.data_source,
                                    t.indicator,
                                    vsp_data_1.upload_id
                                   FROM ( SELECT DISTINCT vsp_data_2.county,
    vsp_data_2.period,
    vsp_data_2.data_group,
    vsp_data_2.data_sub_group,
    vsp_data_2.data_source,
    vsp_data_2.indicator,
    max(vsp_data_2.updated_at) OVER (PARTITION BY vsp_data_2.county, vsp_data_2.period, vsp_data_2.data_group, vsp_data_2.data_sub_group, vsp_data_2.indicator, vsp_data_2.data_source) AS max
   FROM vsp_data vsp_data_2) t
                                     JOIN vsp_data vsp_data_1 ON t.county::text = vsp_data_1.county::text AND t.period = vsp_data_1.period AND t.data_group = vsp_data_1.data_group AND t.data_sub_group = vsp_data_1.data_sub_group AND (t.data_source = vsp_data_1.data_source OR t.data_source IS NULL AND vsp_data_1.data_source IS NULL) AND t.indicator = vsp_data_1.indicator AND t.max = vsp_data_1.updated_at) a ON vsp.county::text = a.county::text AND vsp.period = a.period AND vsp.data_group = a.data_group AND vsp.data_sub_group = a.data_sub_group AND (vsp.data_source = a.data_source OR vsp.data_source IS NULL AND a.data_source IS NULL) AND vsp.indicator = a.indicator AND vsp.upload_id = a.upload_id) vsp_data
                     JOIN ( SELECT DISTINCT dhis_data.periodid,
                            split_part(dhis_data.organisationunitname, ' '::text, 1) AS county
                           FROM dhis_data) dhisperiods ON vsp_data.county::text = dhisperiods.county AND EXTRACT(year FROM vsp_data.period) = EXTRACT(year FROM to_date(dhisperiods.periodid::text, 'YYYYMMDD'::text)) AND vsp_data.khis_uid IS NULL AND (vsp_data.data_sub_group <> ALL (ARRAY['Service Coverage Index'::text, 'Access Index'::text, 'Quality Index'::text]))) alldata
          WHERE alldata.data_group = ANY (ARRAY['Coverage'::text, 'Acess'::text, 'Context'::text, 'Quality'::text])
          GROUP BY alldata.county, alldata.periodid, alldata.data_group, alldata.data_sub_group
        UNION ALL
         SELECT vsp_data.county,
            dhisperiods.periodid,
            vsp_data.data_group,
            vsp_data.data_sub_group,
            vsp_data.value
           FROM ( SELECT vsp.data_source,
                    vsp.category,
                    vsp.indicator_on_khis,
                    vsp.khis_uid,
                    vsp.county,
                    vsp.period,
                    vsp.data_group,
                    vsp.data_sub_group,
                    vsp.indicator,
                    vsp.value
                   FROM vsp_data vsp
                     JOIN ( SELECT DISTINCT t.county,
                            t.period,
                            t.data_group,
                            t.data_sub_group,
                            t.data_source,
                            t.indicator,
                            vsp_data_1.upload_id
                           FROM ( SELECT DISTINCT vsp_data_2.county,
                                    vsp_data_2.period,
                                    vsp_data_2.data_group,
                                    vsp_data_2.data_sub_group,
                                    vsp_data_2.data_source,
                                    vsp_data_2.indicator,
                                    max(vsp_data_2.updated_at) OVER (PARTITION BY vsp_data_2.county, vsp_data_2.period, vsp_data_2.data_group, vsp_data_2.data_sub_group, vsp_data_2.indicator, vsp_data_2.data_source) AS max
                                   FROM vsp_data vsp_data_2) t
                             JOIN vsp_data vsp_data_1 ON t.county::text = vsp_data_1.county::text AND t.period = vsp_data_1.period AND t.data_group = vsp_data_1.data_group AND t.data_sub_group = vsp_data_1.data_sub_group AND (t.data_source = vsp_data_1.data_source OR t.data_source IS NULL AND vsp_data_1.data_source IS NULL) AND t.indicator = vsp_data_1.indicator AND t.max = vsp_data_1.updated_at) a ON vsp.county::text = a.county::text AND vsp.period = a.period AND vsp.data_group = a.data_group AND vsp.data_sub_group = a.data_sub_group AND (vsp.data_source = a.data_source OR vsp.data_source IS NULL AND a.data_source IS NULL) AND vsp.indicator = a.indicator AND vsp.upload_id = a.upload_id) vsp_data
             JOIN ( SELECT DISTINCT dhis_data.periodid,
                    split_part(dhis_data.organisationunitname, ' '::text, 1) AS county
                   FROM dhis_data) dhisperiods ON vsp_data.county::text = dhisperiods.county AND EXTRACT(year FROM vsp_data.period) = EXTRACT(year FROM to_date(dhisperiods.periodid::text, 'YYYYMMDD'::text)) AND vsp_data.khis_uid IS NULL AND vsp_data.data_group = 'Finance'::text) dd;


            "
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW view_vsp_routine_data");
    }
};
