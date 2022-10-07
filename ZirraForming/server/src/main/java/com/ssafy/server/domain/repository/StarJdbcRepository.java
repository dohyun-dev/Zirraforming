package com.ssafy.server.domain.repository;

import com.ssafy.server.api.dto.star.StarDto;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class StarJdbcRepository {
    private final JdbcTemplate jdbcTemplate;

    public void saveAllStars(List<StarDto> starList) {
        Calendar cal = Calendar.getInstance();
        String format = "yyyy-MM-dd";
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        cal.add(cal.DATE, -1);
        String date = sdf.format(cal.getTime());

        jdbcTemplate.batchUpdate("insert into star(member_id, co2, img_url, created_at, updated_at) " +
                        "values(?, ?, ?, ?, ?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, starList.get(i).getMemberId());
                        ps.setDouble(2, starList.get(i).getCo2());
                        ps.setString(3, starList.get(i).getImgUrl());
                        ps.setDate(4, Date.valueOf(date));
                        ps.setDate(5, Date.valueOf(date));
                    }

                    @Override
                    public int getBatchSize() {
                        return starList.size();
                    }
                });
    }
}
